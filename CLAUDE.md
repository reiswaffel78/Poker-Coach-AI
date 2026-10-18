## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.

## Knowledge-graph workflow (graphify-kit)

- **Session start:** a SessionStart hook runs `.graphify/bootstrap.py`. It installs the graphify CLI if missing, installs graphify's git hooks in this clone, and builds or incrementally updates `graphify-out/graph.json` only when code changed. Never trigger a full rebuild just because a new session started. If no hook ran (agent without hooks), run `python .graphify/bootstrap.py` once before the first codebase question.
- **Graph first:** for questions about architecture, modules, functions or dependencies, and before planning code changes, query the graph first: `graphify query "<question>"`, `graphify path "<A>" "<B>"`, `graphify explain "<X>"`, `graphify affected "<X>"` (or the `graphify` MCP tools if connected; same graph.json). Read source files afterwards only to verify or get details.
- **Keep it current:** after code changes and before committing run `graphify update .` (AST only, no LLM, no cost) and commit `graphify-out/graph.json` and `graphify-out/GRAPH_REPORT.md` together with the code. Do not create commits that only touch the graph. Never force-push. A large graph.json diff is expected.
- **Conflicts:** never hand-merge graph.json. Resolve the code, then run `graphify update .`.
- **Cost:** semantic extraction of docs/PDFs/images (`/graphify . --update`) uses an LLM. Only run it on explicit request. Default is code-only.
- **Reverse engineering:** for shipped binaries, Electron/JS bundles, APKs, firmware or apps without full source use REA: `npx -y rea-agents@6.7.0 --help` lists the commands (add `--json`), or the REA MCP tools if connected. Do not use REA for ordinary work on this repository's own source.
<!-- graphify-kit:end -->
