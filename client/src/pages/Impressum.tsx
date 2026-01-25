import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spade, ArrowLeft, Building2, Mail, Phone, User } from "lucide-react";

export default function Impressum() {
  const { t } = useTranslation();

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
              <p className="text-xs text-muted-foreground" data-testid="text-page-subtitle">{t("legal.impressum")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 max-w-4xl mx-auto flex-1" data-testid="container-impressum">
        <div className="space-y-6">
          <Card data-testid="card-impressum">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" data-testid="text-impressum-title">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                {t("legal.impressum")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t("legal.responsiblePerson")}
                  </h3>
                  <div className="text-muted-foreground space-y-1 pl-6">
                    <p className="font-medium text-foreground">[DEIN NAME]</p>
                    <p>[STRASSE UND HAUSNUMMER]</p>
                    <p>[PLZ ORT]</p>
                    <p>[LAND]</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t("legal.contact")}
                  </h3>
                  <div className="text-muted-foreground space-y-1 pl-6">
                    <p>E-Mail: [DEINE-EMAIL@BEISPIEL.DE]</p>
                    <p>{t("legal.phone")}: [OPTIONAL: TELEFONNUMMER]</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">{t("legal.vatId")}</h3>
                  <p className="text-muted-foreground pl-6">
                    [OPTIONAL: UST-IDNR. FALLS VORHANDEN]
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">{t("legal.disclaimer")}</h3>
                  <div className="text-muted-foreground space-y-2 pl-6">
                    <p>{t("legal.disclaimerText1")}</p>
                    <p>{t("legal.disclaimerText2")}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">{t("legal.aiDisclaimer")}</h3>
                  <p className="text-muted-foreground pl-6">
                    {t("legal.aiDisclaimerText")}
                  </p>
                </div>
              </div>
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
