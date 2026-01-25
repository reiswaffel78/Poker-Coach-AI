import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie } from "lucide-react";

const COOKIE_CONSENT_KEY = "poker-coach-cookie-consent";

export function CookieConsent() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4" data-testid="cookie-consent-banner">
      <Card className="container max-w-4xl mx-auto shadow-lg border-2">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="w-6 h-6 text-muted-foreground shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium" data-testid="text-cookie-title">
                  {t("cookie.title")}
                </p>
                <p className="text-sm text-muted-foreground" data-testid="text-cookie-description">
                  {t("cookie.description")}{" "}
                  <Link href="/privacy">
                    <span className="underline hover:text-foreground cursor-pointer">
                      {t("cookie.learnMore")}
                    </span>
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="flex-1 sm:flex-initial"
                data-testid="button-cookie-decline"
              >
                {t("cookie.decline")}
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="flex-1 sm:flex-initial"
                data-testid="button-cookie-accept"
              >
                {t("cookie.accept")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
