import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spade, ArrowLeft, FileText, AlertTriangle, Scale, Ban, CheckCircle2 } from "lucide-react";

export default function Nutzungsbedingungen() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-4xl mx-auto flex h-14 items-center justify-between gap-4 px-4">
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
              <p className="text-xs text-muted-foreground" data-testid="text-page-subtitle">{t("legal.terms")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 max-w-4xl mx-auto flex-1" data-testid="container-terms">
        <div className="space-y-6">
          <Card data-testid="card-terms">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-terms-title">
                <FileText className="w-5 h-5 text-muted-foreground" />
                {t("legal.terms")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {t("terms.acceptance")}
                </h3>
                <p className="text-muted-foreground">
                  {t("terms.acceptanceText")}
                </p>
              </section>

              <section>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {t("terms.service")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("terms.serviceText")}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{t("terms.serviceItem1")}</li>
                    <li>{t("terms.serviceItem2")}</li>
                    <li>{t("terms.serviceItem3")}</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {t("terms.disclaimer")}
                </h3>
                <div className="text-muted-foreground space-y-2 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="font-medium text-foreground">{t("terms.importantNotice")}</p>
                  <p>{t("terms.disclaimerText1")}</p>
                  <p>{t("terms.disclaimerText2")}</p>
                </div>
              </section>

              <section>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  {t("terms.liability")}
                </h3>
                <p className="text-muted-foreground">
                  {t("terms.liabilityText")}
                </p>
              </section>

              <section>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Ban className="w-4 h-4" />
                  {t("terms.prohibited")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("terms.prohibitedText")}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{t("terms.prohibitedItem1")}</li>
                    <li>{t("terms.prohibitedItem2")}</li>
                    <li>{t("terms.prohibitedItem3")}</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="font-semibold mb-3">{t("terms.changes")}</h3>
                <p className="text-muted-foreground">
                  {t("terms.changesText")}
                </p>
              </section>

              <section>
                <h3 className="font-semibold mb-3">{t("terms.law")}</h3>
                <p className="text-muted-foreground">
                  {t("terms.lawText")}
                </p>
              </section>
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground text-center">
            {t("legal.lastUpdated")}: {new Date().toLocaleDateString()}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
