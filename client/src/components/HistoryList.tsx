import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, TrendingUp, TrendingDown, Hand, Target } from "lucide-react";
import type { HandAnalysis } from "@shared/schema";

interface HistoryListProps {
  analyses: HandAnalysis[];
  onSelect: (analysis: HandAnalysis) => void;
  selectedId?: number;
}

const recommendationIcons: Record<string, typeof Target> = {
  "FOLD": TrendingDown,
  "CHECK": Hand,
  "CALL": Target,
  "RAISE": TrendingUp,
  "ALL-IN": TrendingUp,
};

const recommendationColors: Record<string, string> = {
  "FOLD": "destructive",
  "CHECK": "secondary",
  "CALL": "default",
  "RAISE": "default",
  "ALL-IN": "default",
};

export function HistoryList({ analyses, onSelect, selectedId }: HistoryListProps) {
  const { t, i18n } = useTranslation();
  
  if (analyses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center" data-testid="container-history-empty">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
          <Clock className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-sm" data-testid="text-history-empty">
          {t("home.noHistory")}
        </p>
      </div>
    );
  }

  const dateLocale = i18n.language === "de" ? "de-DE" : "en-US";

  return (
    <ScrollArea className="h-[calc(100vh-200px)]" data-testid="container-history-list">
      <div className="space-y-2 pr-2">
        {analyses.map((analysis) => {
          const Icon = recommendationIcons[analysis.recommendation] || Target;
          const isSelected = selectedId === analysis.id;
          
          return (
            <Card
              key={analysis.id}
              className={`cursor-pointer transition-all hover-elevate ${
                isSelected ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => onSelect(analysis)}
              data-testid={`card-history-${analysis.id}`}
            >
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${
                    analysis.recommendation === "FOLD" 
                      ? "bg-destructive/10 text-destructive" 
                      : "bg-primary/10 text-primary"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        variant={recommendationColors[analysis.recommendation] as any}
                        className="text-xs"
                        data-testid={`badge-recommendation-${analysis.id}`}
                      >
                        {analysis.recommendation}
                      </Badge>
                      {analysis.confidence && (
                        <span className="text-xs text-muted-foreground" data-testid={`text-confidence-${analysis.id}`}>
                          {analysis.confidence}%
                        </span>
                      )}
                    </div>
                    {analysis.heroCards && (
                      <p className="text-sm font-medium truncate" data-testid={`text-hero-cards-${analysis.id}`}>
                        {analysis.heroCards}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2" data-testid={`text-reasoning-${analysis.id}`}>
                      {analysis.reasoning}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2" data-testid={`text-date-${analysis.id}`}>
                      {new Date(analysis.createdAt).toLocaleString(dateLocale, {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
}
