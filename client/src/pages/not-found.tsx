import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold" data-testid="text-404-title">{t("notFound.title")}</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground" data-testid="text-404-description">
            {t("notFound.description")}
          </p>

          <Link href="/">
            <Button className="mt-6" data-testid="button-go-home">
              <Home className="w-4 h-4 mr-2" />
              {t("notFound.goHome")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
