import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ScreenshotUpload } from "@/components/ScreenshotUpload";
import { AnalysisResult } from "@/components/AnalysisResult";
import { HistoryList } from "@/components/HistoryList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Spade, History, Plus, Zap, HelpCircle } from "lucide-react";
import type { HandAnalysis, PokerAnalysis } from "@shared/schema";

export default function Home() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [currentAnalysis, setCurrentAnalysis] = useState<PokerAnalysis | null>(null);
  const [currentScreenshot, setCurrentScreenshot] = useState<string | null>(null);
  const [selectedHistoryId, setSelectedHistoryId] = useState<number | undefined>(undefined);

  const { data: history = [], isLoading: historyLoading } = useQuery<HandAnalysis[]>({
    queryKey: ["/api/analyses"],
  });

  const analyzeMutation = useMutation({
    mutationFn: async (imageData: string) => {
      const response = await apiRequest("POST", "/api/analyze", { image: imageData });
      return response.json();
    },
    onSuccess: (data: PokerAnalysis) => {
      setCurrentAnalysis(data);
      setSelectedHistoryId(undefined);
      queryClient.invalidateQueries({ queryKey: ["/api/analyses"] });
      toast({
        title: t("analysis.complete"),
        description: `${t("analysis.recommendation")}: ${data.recommendation}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("analysis.error"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = (imageData: string) => {
    setCurrentScreenshot(imageData);
    analyzeMutation.mutate(imageData);
  };

  const handleSelectHistory = (analysis: HandAnalysis) => {
    setSelectedHistoryId(analysis.id);
    setCurrentAnalysis({
      heroCards: analysis.heroCards || undefined,
      communityCards: analysis.communityCards || undefined,
      position: analysis.position || undefined,
      potSize: analysis.potSize || undefined,
      stackSize: analysis.stackSize || undefined,
      villainAction: analysis.villainAction || undefined,
      recommendation: analysis.recommendation as any,
      reasoning: analysis.reasoning,
      confidence: analysis.confidence || 0,
    });
    setCurrentScreenshot(null);
  };

  const handleNewAnalysis = () => {
    setCurrentAnalysis(null);
    setCurrentScreenshot(null);
    setSelectedHistoryId(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-2xl mx-auto flex h-14 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center" data-testid="icon-logo">
              <Spade className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-none" data-testid="text-app-title">{t("app.title")}</h1>
              <p className="text-xs text-muted-foreground" data-testid="text-app-subtitle">{t("app.subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:flex" data-testid="badge-ai-powered">
              <Zap className="w-3 h-3 mr-1" />
              {t("app.aiPowered")}
            </Badge>
            <Link href="/anleitung">
              <Button variant="ghost" size="icon" data-testid="button-guide">
                <HelpCircle className="w-5 h-5" />
              </Button>
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 max-w-2xl mx-auto" data-testid="container-main">
        <div className="space-y-6">
          {currentAnalysis ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" data-testid="text-section-title">{t("home.analysisResult")}</h2>
                <Button variant="outline" onClick={handleNewAnalysis} data-testid="button-new-analysis">
                  <Plus className="w-4 h-4 mr-2" />
                  {t("home.newAnalysis")}
                </Button>
              </div>
              {currentScreenshot && (
                <Card className="overflow-hidden" data-testid="card-screenshot-result">
                  <img
                    src={currentScreenshot}
                    alt={t("home.analyzedScreenshot")}
                    className="w-full h-auto max-h-[300px] object-contain bg-muted"
                    data-testid="img-analyzed-screenshot"
                  />
                </Card>
              )}
              <AnalysisResult analysis={currentAnalysis} screenshot={currentScreenshot || undefined} />
            </>
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2" data-testid="text-welcome-title">{t("home.analyzeHand")}</h2>
                <p className="text-muted-foreground" data-testid="text-welcome-description">
                  {t("home.uploadDescription")}
                </p>
              </div>
              <ScreenshotUpload
                onAnalyze={handleAnalyze}
                isAnalyzing={analyzeMutation.isPending}
              />
              {analyzeMutation.isPending && (
                <Card data-testid="card-loading">
                  <CardContent className="py-8">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium" data-testid="text-loading-title">{t("home.analyzing")}</p>
                        <p className="text-sm text-muted-foreground" data-testid="text-loading-description">
                          {t("home.analyzingDescription")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          <Card data-testid="card-history">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base" data-testid="text-history-title">
                <History className="w-5 h-5" />
                {t("home.history")}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {historyLoading ? (
                <div className="space-y-3" data-testid="container-history-loading">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton className="w-10 h-10 rounded-md" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <HistoryList
                  analyses={history}
                  onSelect={handleSelectHistory}
                  selectedId={selectedHistoryId}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
