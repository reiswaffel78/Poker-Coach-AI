import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Spade } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30" data-testid="footer">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spade className="w-4 h-4" />
            <span>{currentYear} {t("app.title")}</span>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm" data-testid="footer-nav">
            <Link href="/impressum">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-impressum">
                {t("legal.impressum")}
              </span>
            </Link>
            <Link href="/datenschutz">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-privacy">
                {t("legal.privacy")}
              </span>
            </Link>
            <Link href="/nutzungsbedingungen">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-terms">
                {t("legal.terms")}
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
