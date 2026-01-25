import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
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
  const { t } = useTranslation();

  const handleDownloadExtension = async () => {
    window.open("/api/extension/download", "_blank");
  };

  const features = [
    t("guide.features.holeCards"),
    t("guide.features.communityCards"),
    t("guide.features.position"),
    t("guide.features.potStack"),
    t("guide.features.villainActions"),
    t("guide.features.phase")
  ];

  const tips = [
    t("guide.tipsList.visible"),
    t("guide.tipsList.readable"),
    t("guide.tipsList.actions"),
    t("guide.tipsList.timing")
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
              <h1 className="text-lg font-semibold leading-none" data-testid="text-app-title">{t("app.title")}</h1>
              <p className="text-xs text-muted-foreground" data-testid="text-app-subtitle">{t("guide.title")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 max-w-4xl" data-testid="container-guide">
        <div className="space-y-8">
          <section className="text-center mb-12" data-testid="section-hero">
            <div className="w-20 h-20 rounded-xl bg-primary flex items-center justify-center mx-auto mb-6">
              <Spade className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4" data-testid="text-guide-title">
              {t("guide.welcome")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-guide-intro">
              {t("guide.intro")}
            </p>
          </section>

          <Card data-testid="card-what-is">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-what-is-title">
                <Zap className="w-5 h-5 text-muted-foreground" />
                {t("guide.whatIs")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p data-testid="text-what-is-description">
                {t("guide.whatIsDescription")}
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
                {t("guide.recommendations")}
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-webapp">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-webapp-title">
                <Monitor className="w-5 h-5 text-muted-foreground" />
                {t("guide.webapp")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex gap-4 items-start" data-testid="step-webapp-1">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1" data-testid="text-step1-title">{t("guide.steps.screenshot.title")}</h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-step1-description">
                      {t("guide.steps.screenshot.description")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start" data-testid="step-webapp-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1" data-testid="text-step2-title">{t("guide.steps.upload.title")}</h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-step2-description">
                      {t("guide.steps.upload.description")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start" data-testid="step-webapp-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1" data-testid="text-step3-title">{t("guide.steps.result.title")}</h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-step3-description">
                      {t("guide.steps.result.description")}
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
                {t("guide.extension")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p data-testid="text-extension-description">
                {t("guide.extensionDescription")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-muted/50 border" data-testid="container-hotkey">
                <div className="flex items-center gap-3">
                  <Keyboard className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <div className="font-semibold" data-testid="text-hotkey-label">{t("guide.hotkey")}</div>
                    <kbd className="px-2 py-1 rounded bg-muted text-sm font-mono" data-testid="text-hotkey-value">Ctrl + Shift + P</kbd>
                  </div>
                </div>
                <div className="flex-1 text-sm text-muted-foreground flex items-center" data-testid="text-hotkey-description">
                  {t("guide.hotkeyDescription")}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium" data-testid="text-installation-title">{t("guide.installation")}</h4>
                <div className="grid gap-3" data-testid="list-installation-steps">
                  <div className="flex gap-4 items-start" data-testid="step-install-1">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-sm">
                      1
                    </div>
                    <p className="text-sm" data-testid="text-install-step-1">
                      {t("guide.installSteps.download")}
                    </p>
                  </div>
                  <div className="flex gap-4 items-start" data-testid="step-install-2">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-sm">
                      2
                    </div>
                    <p className="text-sm" data-testid="text-install-step-2">
                      {t("guide.installSteps.openChrome")} <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">chrome://extensions/</kbd>
                    </p>
                  </div>
                  <div className="flex gap-4 items-start" data-testid="step-install-3">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-sm">
                      3
                    </div>
                    <p className="text-sm" data-testid="text-install-step-3">
                      {t("guide.installSteps.devMode")}
                    </p>
                  </div>
                  <div className="flex gap-4 items-start" data-testid="step-install-4">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-sm">
                      4
                    </div>
                    <p className="text-sm" data-testid="text-install-step-4">
                      {t("guide.installSteps.loadUnpacked")}
                    </p>
                  </div>
                  <div className="flex gap-4 items-start" data-testid="step-install-5">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 text-sm">
                      5
                    </div>
                    <p className="text-sm" data-testid="text-install-step-5">
                      {t("guide.installSteps.done")} <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">Ctrl+Shift+P</kbd>
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={handleDownloadExtension} size="lg" className="w-full sm:w-auto" data-testid="button-download-extension">
                <Download className="w-4 h-4 mr-2" />
                {t("guide.downloadExtension")}
              </Button>
            </CardContent>
          </Card>

          <Card data-testid="card-tips">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-tips-title">
                <Image className="w-5 h-5 text-muted-foreground" />
                {t("guide.tips")}
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
                {t("guide.startAnalysis")}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
