import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spade, ArrowLeft, Shield, Database, Cookie, Eye, Trash2, Server } from "lucide-react";

export default function Datenschutz() {
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
              <p className="text-xs text-muted-foreground" data-testid="text-page-subtitle">{t("legal.privacy")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 max-w-4xl mx-auto flex-1" data-testid="container-datenschutz">
        <div className="space-y-6">
          <Card data-testid="card-privacy">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-privacy-title">
                <Shield className="w-5 h-5 text-muted-foreground" />
                {t("legal.privacy")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <section>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {t("privacy.overview")}
                </h3>
                <p className="text-muted-foreground">
                  {t("privacy.overviewText")}
                </p>
              </section>

              <section>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  {t("privacy.dataCollection")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("privacy.dataCollectionText")}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{t("privacy.dataItem1")}</li>
                    <li>{t("privacy.dataItem2")}</li>
                    <li>{t("privacy.dataItem3")}</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  {t("privacy.aiProcessing")}
                </h3>
                <p className="text-muted-foreground">
                  {t("privacy.aiProcessingText")}
                </p>
              </section>

              <section>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Cookie className="w-4 h-4" />
                  {t("privacy.cookies")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("privacy.cookiesText")}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{t("privacy.cookieItem1")}</li>
                    <li>{t("privacy.cookieItem2")}</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  {t("privacy.rights")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("privacy.rightsText")}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{t("privacy.right1")}</li>
                    <li>{t("privacy.right2")}</li>
                    <li>{t("privacy.right3")}</li>
                    <li>{t("privacy.right4")}</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="font-semibold mb-3">{t("privacy.contact")}</h3>
                <p className="text-muted-foreground">
                  {t("privacy.contactText")}
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
