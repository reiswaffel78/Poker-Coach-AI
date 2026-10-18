#!/usr/bin/env python3
"""graphify-kit bootstrap: runs at the start of every agent session.

Called by the SessionStart hook in .claude/settings.json (Claude Code, local
and cloud). Can also be run by hand: python .graphify/bootstrap.py

What it does, in order (idempotent, fail-open, code-only - no LLM, nothing
leaves the machine):
  1. makes sure the graphify CLI is installed (uv -> pipx -> pip --user)
  2. installs graphify's git hooks in this clone if missing (they live in
     .git/hooks and are never part of a clone)
  3. builds graphify-out/graph.json if it is missing, or updates it
     incrementally if code changed since the graph was last built
  4. prints a one-line status the agent sees as session context

It never commits, pushes or rebuilds a current graph just because a new
session started. Opt out: GRAPHIFY_BOOTSTRAP=0
"""
from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import time
from pathlib import Path

KIT_VERSION = "1"
PKG = "graphifyy[mcp]>=0.9.92"
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "graphify-out"
GRAPH = OUT / "graph.json"
# Paths whose changes never make the graph stale.
IGNORED = ("graphify-out/", ".graphify/", ".claude/", ".agents/", ".cursor/",
           ".git/", ".github/", "CLAUDE.md", "AGENTS.md", ".gitignore",
           ".gitattributes", ".graphifyignore", ".mcp.json")
BUILD_TIMEOUT = int(os.environ.get("GRAPHIFY_BOOTSTRAP_TIMEOUT", "900"))


def say(msg: str) -> None:
    print(f"[graphify] {msg}", flush=True)


def run(cmd: list[str], timeout: int = 120, env: dict | None = None):
    try:
        return subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True,
                              timeout=timeout, env=env)
    except (OSError, subprocess.SubprocessError):
        return None


def git(*args: str) -> str | None:
    r = run(["git", *args], timeout=30)
    if r is None or r.returncode != 0:
        return None
    # rstrip only: porcelain lines start with a meaningful space (" M file")
    return r.stdout.rstrip()


def ensure_path() -> None:
    """Put the usual user-level bin dirs on PATH (uv/pipx/pip --user)."""
    home = Path.home()
    candidates = [home / ".local" / "bin"]
    if os.name == "nt":
        appdata = os.environ.get("APPDATA")
        if appdata:
            py = f"Python{sys.version_info.major}{sys.version_info.minor}"
            candidates.append(Path(appdata) / "Python" / py / "Scripts")
    path = os.environ.get("PATH", "")
    added = []
    for d in candidates:
        if d.is_dir() and str(d) not in path.split(os.pathsep):
            path = str(d) + os.pathsep + path
            added.append(d)
    os.environ["PATH"] = path
    # Claude Code: lines written here become env for the rest of the session.
    env_file = os.environ.get("CLAUDE_ENV_FILE")
    if env_file and added:
        try:
            with open(env_file, "a", encoding="utf-8") as f:
                for d in added:
                    p = d.as_posix()
                    if os.name == "nt" and len(p) > 1 and p[1] == ":":
                        p = "/" + p[0].lower() + p[2:]  # Git Bash form: C:/x -> /c/x
                    f.write(f'export PATH="{p}:$PATH"\n')
        except OSError:
            pass


def ensure_graphify() -> str | None:
    ensure_path()
    exe = shutil.which("graphify")
    if exe:
        return exe
    attempts = [
        ["uv", "tool", "install", PKG],
        ["pipx", "install", PKG],
        [sys.executable, "-m", "pip", "install", "--user", "--quiet", PKG],
        [sys.executable, "-m", "pip", "install", "--user", "--quiet",
         "--break-system-packages", PKG],
    ]
    for cmd in attempts:
        if cmd[0] != sys.executable and not shutil.which(cmd[0]):
            continue
        run(cmd, timeout=300)
        ensure_path()
        exe = shutil.which("graphify")
        if exe:
            say("CLI installiert")
            return exe
    return None


def ensure_git_hooks(exe: str) -> None:
    gd = git("rev-parse", "--git-dir")
    if not gd:
        return
    hooks = Path(gd) if os.path.isabs(gd) else ROOT / gd
    hook = hooks / "hooks" / "post-commit"
    try:
        if hook.is_file() and "graphify-hook-start" in hook.read_text(errors="ignore"):
            return
    except OSError:
        pass
    run([exe, "hook", "install"], timeout=60)


def relevant(path: str) -> bool:
    return bool(path) and not path.startswith(IGNORED) and not path.endswith(".graphify-bak")


def ensure_merge_config() -> None:
    """Local git config (never part of a clone): keep our side for the derived
    report/labels on merge; the post-merge hook rebuilds them anyway."""
    if git("config", "--get", "merge.ours.driver") is None:
        git("config", "merge.ours.driver", "true")


def wait_for_hook_rebuild(limit: float = 120.0) -> None:
    """graphify's post-commit hook rebuilds in the background under
    graphify-out/.rebuild.lock. Don't judge freshness while it runs."""
    lock = OUT / ".rebuild.lock"
    t0 = time.time()
    while lock.exists() and time.time() - t0 < limit:
        time.sleep(1)


def staleness() -> str | None:
    """Return a reason string if the graph needs an (incremental) update."""
    if not GRAPH.is_file():
        return "noch kein Graph"
    if git("rev-parse", "--is-inside-work-tree") != "true":
        return None  # no git: rely on the agent rule `graphify update .`
    wait_for_hook_rebuild()

    # 1) uncommitted or untracked code -> incremental update (cheap, cached)
    st = git("status", "--porcelain", "--untracked-files=all") or ""
    dirty = []
    for line in st.splitlines():
        p = line[3:].strip().strip('"')
        if " -> " in p:
            p = p.split(" -> ", 1)[1]
        if relevant(p):
            dirty.append(p)
    if dirty:
        return f"lokale Änderung: {dirty[0]}" + (f" (+{len(dirty) - 1})" if len(dirty) > 1 else "")

    # 2) committed code changes after the commit that last stored graph.json,
    #    unless the post-commit hook has already rebuilt it in this clone
    locally_rebuilt = bool(git("status", "--porcelain", "--", "graphify-out/graph.json"))
    if locally_rebuilt:
        return None
    last = git("log", "-1", "--format=%H", "--", "graphify-out/graph.json")
    if not last:
        return "Graph ist keinem Commit zugeordnet"
    diff = git("diff", "--name-only", last, "HEAD") or ""
    changed = [p for p in diff.splitlines() if relevant(p)]
    if changed:
        return f"{len(changed)} Datei(en) seit dem letzten Graph-Commit geändert"
    return None


def node_count() -> int | None:
    try:
        with open(GRAPH, encoding="utf-8") as f:
            return len(json.load(f).get("nodes", []))
    except (OSError, ValueError):
        return None


def main() -> int:
    if os.environ.get("GRAPHIFY_BOOTSTRAP", "1") == "0":
        return 0
    exe = ensure_graphify()
    if not exe:
        say("CLI nicht installierbar (kein uv/pipx/pip?). Graph-Abfragen nicht "
            "möglich; normal mit Dateien arbeiten. Manuell: uv tool install "
            f"\"{PKG}\"")
        return 0
    ensure_git_hooks(exe)
    ensure_merge_config()

    reason = staleness()
    if reason:
        env = dict(os.environ, PYTHONHASHSEED="0", GRAPHIFY_BACKEND="none")
        t0 = time.time()
        r = run([exe, "update", "."], timeout=BUILD_TIMEOUT, env=env)
        dt = time.time() - t0
        if r is None or r.returncode != 0 or not GRAPH.is_file():
            tail = ((r.stdout + r.stderr) if r else "Timeout").strip().splitlines()[-3:]
            say(f"Graph-Update fehlgeschlagen ({reason}): {' | '.join(tail)}")
            return 0
        say(f"Graph aktualisiert ({reason}, {dt:.0f}s)")

    n = node_count()
    say(f"Knowledge Graph bereit: graphify-out/graph.json ({n} Knoten). "
        "Für Fragen zu Architektur, Abhängigkeiten oder Code-Orten zuerst "
        "`graphify query \"...\"`, `graphify path A B` oder `graphify explain X` "
        "nutzen, dann gezielt Dateien lesen. Nach Codeänderungen vor dem Commit "
        "`graphify update .` ausführen.")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as exc:  # fail open: never block a session
        say(f"Bootstrap-Fehler ignoriert: {exc}")
        sys.exit(0)
