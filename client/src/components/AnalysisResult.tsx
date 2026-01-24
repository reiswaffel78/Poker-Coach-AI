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

export function AnalysisResult({ analysis, screenshot }: AnalysisResultProps) {
  const style = recommendationStyles[analysis.recommendation] || recommendationStyles["CHECK"];
  const RecommendationIcon = style.icon;

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
                <p className="text-sm opacity-90">Empfehlung</p>
                <h2 className="text-3xl font-bold" data-testid="text-recommendation">
                  {analysis.recommendation}
                </h2>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Sicherheit</p>
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
                <span className="text-xs">Deine Karten</span>
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
                <span className="text-xs">Board</span>
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
                <span className="text-xs">Position</span>
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
                <span className="text-xs">Pot</span>
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
            Begründung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed" data-testid="text-reasoning">
            {analysis.reasoning}
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Konfidenz:</span>
        <Progress value={analysis.confidence} className="flex-1" />
        <Badge variant={analysis.confidence >= 70 ? "default" : "secondary"}>
          {analysis.confidence >= 80 ? "Sehr sicher" : analysis.confidence >= 60 ? "Sicher" : "Unsicher"}
        </Badge>
      </div>
    </div>
  );
}
