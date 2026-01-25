import { Link } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Spade, 
  ArrowLeft, 
  Download, 
  Camera, 
  Keyboard, 
  Monitor, 
  CheckCircle2,
  Zap,
  Chrome,
  Image
} from "lucide-react";

export default function Guide() {
  const handleDownloadExtension = async () => {
    window.open("/api/extension/download", "_blank");
  };

  const features = [
    "Deine Hole Cards",
    "Community Cards auf dem Tisch",
    "Deine Position am Tisch",
    "Pot-Größe und Stack-Sizes",
    "Aktionen der Gegner",
    "Spielphase (Preflop, Flop, etc.)"
  ];

  const tips = [
    "Stelle sicher, dass deine Karten und der Tisch gut sichtbar sind.",
    "Die Pot-Größe und Stack-Sizes sollten lesbar sein.",
    "Aktionen der Gegner (Bet, Raise, etc.) sollten im Screenshot erkennbar sein.",
    "Mache den Screenshot, bevor du deine Aktion ausführst."
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center" data-testid="icon-logo">
              <Spade className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-none" data-testid="text-app-title">Poker Coach</h1>
              <p className="text-xs text-muted-foreground" data-testid="text-app-subtitle">Anleitung</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container px-4 py-8 max-w-4xl" data-testid="container-guide">
        <div className="space-y-8">
          <section className="text-center mb-12" data-testid="section-hero">
            <div className="w-20 h-20 rounded-xl bg-primary flex items-center justify-center mx-auto mb-6">
              <Spade className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4" data-testid="text-guide-title">
              Willkommen bei Poker Coach
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-guide-intro">
              Dein KI-gestützter Poker-Trainingsassistent analysiert deine Spielsituationen 
              und gibt dir sofortige Handlungsempfehlungen auf Deutsch.
            </p>
          </section>

          <Card data-testid="card-what-is">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-what-is-title">
                <Zap className="w-5 h-5 text-muted-foreground" />
                Was ist Poker Coach?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p data-testid="text-what-is-description">
                Poker Coach nutzt künstliche Intelligenz, um Screenshots von deinen Online-Poker-Spielen zu analysieren. 
                Die KI erkennt automatisch:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3" data-testid="list-features">
                {features.map((item, i) => (
                  <li key={i} className="flex items-center gap-2" data-testid={`text-feature-${i}`}>
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p data-testid="text-recommendations">
                Basierend auf dieser Analyse erhältst du eine klare Empfehlung 
                (<Badge variant="outline">FOLD</Badge>, <Badge variant="outline">CHECK</Badge>, <Badge variant="outline">CALL</Badge>, <Badge variant="outline">RAISE</Badge> oder <Badge variant="outline">ALL-IN</Badge>) 
                mit ausführlicher Begründung.
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-webapp">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-webapp-title">
                <Monitor className="w-5 h-5 text-muted-foreground" />
                Web-App nutzen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex gap-4 items-start" data-testid="step-webapp-1">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1" data-testid="text-step1-title">Screenshot erstellen</h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-step1-description">
                      Mache einen Screenshot deines Pokerspiels mit der Tastenkombination 
                      deines Systems (Windows: <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">Win+Shift+S</kbd>, 
                      Mac: <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">Cmd+Shift+4</kbd>).
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start" data-testid="step-webapp-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1" data-testid="text-step2-title">Bild hochladen</h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-step2-description">
                      Ziehe das Bild in den Upload-Bereich oder klicke zum Auswählen. 
                      Du kannst auch direkt aus der Zwischenablage einfügen.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start" data-testid="step-webapp-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1" data-testid="text-step3-title">Empfehlung erhalten</h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-step3-description">
                      Die KI analysiert das Bild und zeigt dir innerhalb weniger Sekunden 
                      die optimale Aktion mit ausführlicher Begründung.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/50" data-testid="card-extension">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-extension-title">
                <Chrome className="w-5 h-5 text-muted-foreground" />
                Browser-Extension (empfohlen)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p data-testid="text-extension-description">
                Für maximalen Komfort: Die Chrome-Extension ermöglicht dir, 
                mit einem einzigen Tastendruck eine Analyse direkt im Browser zu starten!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-muted/50 border" data-testid="container-hotkey">
                <div className="flex items-center gap-3">
                  <Keyboard className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <div className="font-semibold" data-testid="text-hotkey-label">Hotkey</div>
                    <kbd className="px-2 py-1 rounded bg-muted text-sm font-mono" data-testid="text-hotkey-value">Ctrl + Shift + P</kbd>
                  </div>
                </div>
                <div className="flex-1 text-sm text-muted-foreground flex items-center" data-testid="text-hotkey-description">
                  Drücke diese Kombination während deines Pokerspiels. 
                  Die Empfehlung erscheint als Overlay direkt im Browser.
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium" data-testid="text-installation-title">Installation:</h4>
                <div className="grid gap-3" data-testid="list-installation-steps">
                  <div className="flex gap-4 items-start" data-testid="step-install-1">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-sm">
                      1
                    </div>
                    <p className="text-sm" data-testid="text-install-step-1">
                      Klicke auf <strong>"Extension herunterladen"</strong> und entpacke die ZIP-Datei.
                    </p>
                  </div>
                  <div className="flex gap-4 items-start" data-testid="step-install-2">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-sm">
                      2
                    </div>
                    <p className="text-sm" data-testid="text-install-step-2">
                      Öffne Chrome und gehe zu <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">chrome://extensions/</kbd>
                    </p>
                  </div>
                  <div className="flex gap-4 items-start" data-testid="step-install-3">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-sm">
                      3
                    </div>
                    <p className="text-sm" data-testid="text-install-step-3">
                      Aktiviere oben rechts den <strong>"Entwicklermodus"</strong>.
                    </p>
                  </div>
                  <div className="flex gap-4 items-start" data-testid="step-install-4">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-sm">
                      4
                    </div>
                    <p className="text-sm" data-testid="text-install-step-4">
                      Klicke auf <strong>"Entpackte Erweiterung laden"</strong> und wähle den entpackten Ordner.
                    </p>
                  </div>
                  <div className="flex gap-4 items-start" data-testid="step-install-5">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-sm">
                      5
                    </div>
                    <p className="text-sm" data-testid="text-install-step-5">
                      Fertig! Nutze jetzt <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">Ctrl+Shift+P</kbd> auf jeder Poker-Seite.
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={handleDownloadExtension} size="lg" className="w-full sm:w-auto" data-testid="button-download-extension">
                <Download className="w-4 h-4 mr-2" />
                Extension herunterladen (ZIP)
              </Button>
            </CardContent>
          </Card>

          <Card data-testid="card-tips">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-tips-title">
                <Image className="w-5 h-5 text-muted-foreground" />
                Tipps für beste Ergebnisse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3" data-testid="list-tips">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2" data-testid={`text-tip-${i}`}>
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="text-center pt-4">
            <Link href="/">
              <Button variant="outline" size="lg" data-testid="button-start-analyzing">
                <Camera className="w-4 h-4 mr-2" />
                Jetzt Analyse starten
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
