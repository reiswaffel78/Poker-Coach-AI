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
