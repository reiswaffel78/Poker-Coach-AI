import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Hand, 
  Users, 
  Coins, 
  MapPin,
  Brain,
  Flame,
  Share2,
  Twitter,
  Copy,
  Check,
  Grid3X3
} from "lucide-react";
import type { PokerAnalysis } from "@shared/schema";
import { RangeMatrix } from "@/components/RangeMatrix";
import { rangePresets } from "@/data/range-presets";

interface AnalysisResultProps {
  analysis: PokerAnalysis;
  screenshot?: string;
  isRoast?: boolean;
}

const recommendationStyles: Record<string, { bg: string; text: string; icon: typeof Target }> = {
  "FOLD": { bg: "bg-destructive", text: "text-destructive-foreground", icon: TrendingDown },
  "CHECK": { bg: "bg-secondary", text: "text-secondary-foreground", icon: Hand },
  "CALL": { bg: "bg-accent", text: "text-accent-foreground", icon: Target },
  "RAISE": { bg: "bg-primary", text: "text-primary-foreground", icon: TrendingUp },
  "ALL-IN": { bg: "bg-primary", text: "text-primary-foreground", icon: TrendingUp },
};

export function AnalysisResult({ analysis, isRoast = false }: AnalysisResultProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const style = recommendationStyles[analysis.recommendation] || recommendationStyles["CHECK"];
  const RecommendationIcon = style.icon;

  const shareText = isRoast 
    ? `I got roasted by Poker Coach AI! My ${analysis.heroCards || "hand"} got a "${analysis.recommendation}" verdict. ${analysis.reasoning?.substring(0, 100)}... Get your hand roasted at`
    : `Poker Coach AI says ${analysis.recommendation} with ${analysis.confidence}% confidence for my ${analysis.heroCards || "hand"}. Try it at`;
  const shareUrl = "https://poker-coach-ai.replit.app/app";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      toast({ title: "Copied to clipboard!" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const handleTwitterShare = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(tweetUrl, "_blank", "noopener,noreferrer");
  };

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

      <Card className={isRoast ? "border-orange-500/30 bg-orange-500/5" : ""}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            {isRoast ? (
              <Flame className="w-5 h-5 text-orange-500" />
            ) : (
              <Brain className="w-5 h-5 text-primary" />
            )}
            {isRoast ? "The Roast" : t("analysis.reasoning")}
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
        <Progress value={analysis.confidence ?? 0} className="flex-1" />
        <Badge variant={(analysis.confidence ?? 0) >= 70 ? "default" : "secondary"}>
          {(analysis.confidence ?? 0) >= 80 ? "85%" : (analysis.confidence ?? 0) >= 60 ? "70%" : "50%"}
        </Badge>
      </div>

      {!analysis.communityCards && analysis.position && (() => {
        const positionMap: Record<string, string> = {
          "UTG": "utg-open",
          "MP": "mp-open",
          "CO": "co-open",
          "BTN": "btn-open",
          "SB": "sb-open",
          "BB": "bb-defend"
        };
        const presetId = positionMap[analysis.position];
        const preset = rangePresets.find(p => p.id === presetId);
        if (!preset) return null;
        return (
          <Card data-testid="card-range-reference">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Grid3X3 className="w-5 h-5 text-primary" />
                {analysis.position} Opening Range Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Compare your hand with typical {analysis.position} opening ranges.
              </p>
              <div className="flex justify-center">
                <RangeMatrix ranges={preset.ranges} showLegend={true} />
              </div>
            </CardContent>
          </Card>
        );
      })()}

      <Card className="bg-muted/50">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">
                {isRoast ? "Share your roast!" : "Share your analysis"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleTwitterShare}
                data-testid="button-share-twitter"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Tweet
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyLink}
                data-testid="button-copy-link"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
