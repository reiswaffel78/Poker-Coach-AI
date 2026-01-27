import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Spade, ExternalLink, Heart, Coffee, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30" data-testid="footer">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <Spade className="w-4 h-4" />
              <span>{currentYear} {t("app.title")}</span>
              <Badge variant="outline" className="ml-2 text-xs" data-testid="badge-18-plus">18+</Badge>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="outline" size="sm" className="gap-2" asChild data-testid="button-contact">
                <a href="mailto:pokercoachai@proton.me">
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </a>
              </Button>
              <Link href="/support">
                <Button variant="outline" size="sm" className="gap-2" data-testid="button-donate">
                  <Coffee className="w-4 h-4" />
                  <span>Support Us</span>
                </Button>
              </Link>
              
              <nav className="flex flex-wrap items-center justify-center gap-4 text-sm" data-testid="footer-nav">
                <Link href="/privacy">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-privacy">
                    {t("legal.privacy")}
                  </span>
                </Link>
                <Link href="/terms">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-terms">
                    {t("legal.terms")}
                  </span>
                </Link>
              </nav>
            </div>
          </div>

          <div className="border-t pt-4" data-testid="built-with">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
              <span>Built with</span>
              <a 
                href="https://replit.com/refer/meinnummer999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors"
                data-testid="link-replit"
              >
                <svg className="w-4 h-4" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M7 5.5C7 4.11929 8.11929 3 9.5 3H16.5V10.5H9.5C8.11929 10.5 7 9.38071 7 8V5.5Z"/>
                  <path d="M16.5 10.5H23.5C24.8807 10.5 26 11.6193 26 13V15.5C26 16.8807 24.8807 18 23.5 18H16.5V10.5Z"/>
                  <path d="M7 24V26.5C7 27.8807 8.11929 29 9.5 29H16.5V21.5H9.5C8.11929 21.5 7 22.6193 7 24Z"/>
                  <path d="M16.5 14H9.5C8.11929 14 7 15.1193 7 16.5V17.5C7 18.8807 8.11929 20 9.5 20H16.5V14Z"/>
                </svg>
                Replit
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="border-t pt-4" data-testid="responsible-gambling">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>Play Responsibly</span>
              </div>
              <span className="hidden sm:inline">|</span>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a 
                  href="https://www.gamblingtherapy.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  data-testid="link-gambling-therapy"
                >
                  Gambling Therapy
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://www.begambleaware.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  data-testid="link-begambleaware"
                >
                  BeGambleAware
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://www.ncpgambling.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  data-testid="link-ncpg"
                >
                  NCPG (US)
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
