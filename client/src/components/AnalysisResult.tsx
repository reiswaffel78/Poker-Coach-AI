import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Hand, 
  Users, 
  Coins, 
  MapPin,
  Brain
} from "lucide-react";
import type { PokerAnalysis } from "@shared/schema";

interface AnalysisResultProps {
  analysis: PokerAnalysis;
  screenshot?: string;
}

const recommendationStyles: Record<string, { bg: string; text: string; icon: typeof Target }> = {
  "FOLD": { bg: "bg-destructive", text: "text-destructive-foreground", icon: TrendingDown },
  "CHECK": { bg: "bg-secondary", text: "text-secondary-foreground", icon: Hand },
  "CALL": { bg: "bg-accent", text: "text-accent-foreground", icon: Target },
  "RAISE": { bg: "bg-primary", text: "text-primary-foreground", icon: TrendingUp },
  "ALL-IN": { bg: "bg-primary", text: "text-primary-foreground", icon: TrendingUp },
};

export function AnalysisResult({ analysis }: AnalysisResultProps) {
  const { t } = useTranslation();
  const style = recommendationStyles[analysis.recommendation] || recommendationStyles["CHECK"];
  const RecommendationIcon = style.icon;

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 80) return t("analysis.confidence") + ": " + t("analysis.gameState");
    if (confidence >= 60) return t("analysis.confidence");
    return t("analysis.unknown");
  };

  return (
    <div className="space-y-4">
      <Card className={`${style.bg} ${style.text} border-0`}>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <RecommendationIcon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm opacity-90">{t("analysis.recommendation")}</p>
                <h2 className="text-3xl font-bold" data-testid="text-recommendation">
                  {analysis.recommendation}
                </h2>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">{t("analysis.confidence")}</p>
              <p className="text-2xl font-bold" data-testid="text-confidence">
                {analysis.confidence}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {analysis.heroCards && (
          <Card className="hover-elevate">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Hand className="w-4 h-4" />
                <span className="text-xs">{t("analysis.heroCards")}</span>
              </div>
              <p className="font-semibold" data-testid="text-hero-cards">{analysis.heroCards}</p>
            </CardContent>
          </Card>
        )}
        {analysis.communityCards && (
          <Card className="hover-elevate">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs">{t("analysis.communityCards")}</span>
              </div>
              <p className="font-semibold" data-testid="text-community-cards">{analysis.communityCards}</p>
            </CardContent>
          </Card>
        )}
        {analysis.position && (
          <Card className="hover-elevate">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs">{t("analysis.position")}</span>
              </div>
              <p className="font-semibold" data-testid="text-position">{analysis.position}</p>
            </CardContent>
          </Card>
        )}
        {analysis.potSize && (
          <Card className="hover-elevate">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Coins className="w-4 h-4" />
                <span className="text-xs">{t("analysis.potSize")}</span>
              </div>
              <p className="font-semibold" data-testid="text-pot-size">{analysis.potSize}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Brain className="w-5 h-5 text-primary" />
            {t("analysis.reasoning")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed" data-testid="text-reasoning">
            {analysis.reasoning}
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{t("analysis.confidence")}:</span>
        <Progress value={analysis.confidence} className="flex-1" />
        <Badge variant={analysis.confidence >= 70 ? "default" : "secondary"}>
          {analysis.confidence >= 80 ? "85%" : analysis.confidence >= 60 ? "70%" : "50%"}
        </Badge>
      </div>
    </div>
  );
}
