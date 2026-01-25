import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { Helmet } from "react-helmet-async";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { useBreadcrumbSchema } from "@/hooks/useBreadcrumbSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Spade, 
  ArrowLeft,
  Target,
  Layers,
  TrendingUp,
  CircleDot,
  Brain,
  AlertTriangle,
  BookOpen,
  ChevronRight,
  Users,
  Zap,
  HelpCircle
} from "lucide-react";
import { getSpotBySlug, type SpotCategory, type PokerSpot } from "@/data/poker-spots";

const categoryConfig: Record<SpotCategory, { label: string; icon: typeof Target; color: string }> = {
  preflop: { label: "Preflop", icon: CircleDot, color: "bg-primary" },
  flop: { label: "Flop", icon: Layers, color: "bg-accent" },
  turn: { label: "Turn", icon: TrendingUp, color: "bg-secondary" },
  river: { label: "River", icon: Target, color: "bg-destructive" }
};

const difficultyColors: Record<PokerSpot["difficulty"], string> = {
  beginner: "bg-accent/20 text-accent-foreground border-accent/20",
  intermediate: "bg-secondary text-secondary-foreground border-secondary",
  advanced: "bg-destructive/20 text-destructive border-destructive/20"
};

const actionColors: Record<string, string> = {
  fold: "text-muted-foreground",
  check: "text-muted-foreground",
  call: "text-blue-600 dark:text-blue-400",
  bet: "text-green-600 dark:text-green-400",
  raise: "text-primary",
  "all-in": "text-destructive"
};

export default function SpotDetail() {
  const params = useParams<{ slug: string }>();
  const spot = getSpotBySlug(params.slug || "");

  useBreadcrumbSchema([
    { name: "Poker Spots", path: "/spots" },
    { name: spot?.title || "Spot", path: `/spots/${params.slug}` }
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!spot) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Spot Not Found</h1>
        <Link href="/spots">
          <Button>Back to Spots</Button>
        </Link>
      </div>
    );
  }

  const config = categoryConfig[spot.category];
  const CategoryIcon = config.icon;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": spot.title,
    "description": spot.description,
    "articleSection": `Poker ${config.label} Strategy`,
    "keywords": spot.tags.join(", ")
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{spot.title} | Poker Spot Analysis</title>
        <meta name="description" content={spot.description} />
        <link rel="canonical" href={`https://poker-coach-ai.replit.app/spots/${spot.slug}`} />
        <meta property="og:title" content={`${spot.title} | Poker Spot Analysis`} />
        <meta property="og:description" content={spot.description} />
        <meta property="og:url" content={`https://poker-coach-ai.replit.app/spots/${spot.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://poker-coach-ai.replit.app/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-4xl mx-auto flex h-14 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <Link href="/spots">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center" data-testid="icon-logo">
              <Spade className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-none" data-testid="text-app-title">Poker Spots</h1>
              <p className="text-xs text-muted-foreground" data-testid="text-page-subtitle">{config.label}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 max-w-4xl mx-auto flex-1" data-testid="container-spot-detail">
        <div className="space-y-6">
          <div className="flex flex-wrap items-start gap-3">
            <div className={`w-12 h-12 rounded-lg ${config.color} flex items-center justify-center shrink-0`}>
              <CategoryIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold" data-testid="text-spot-title">{spot.title}</h1>
                <Badge variant="outline" className={`${difficultyColors[spot.difficulty]}`}>
                  {spot.difficulty}
                </Badge>
              </div>
              <p className="text-muted-foreground" data-testid="text-spot-description">{spot.description}</p>
            </div>
          </div>

          {(spot.heroHand || spot.board) && (
            <div className="flex flex-wrap gap-4">
              {spot.heroHand && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Hand:</span>
                  <Badge variant="secondary" className="font-mono">{spot.heroHand}</Badge>
                </div>
              )}
              {spot.board && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Board:</span>
                  <Badge variant="secondary" className="font-mono">{spot.board}</Badge>
                </div>
              )}
            </div>
          )}

          <Card data-testid="card-when-happens">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
                When Does This Spot Occur?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground" data-testid="text-when-happens">{spot.whenItHappens}</p>
            </CardContent>
          </Card>

          <Card data-testid="card-action-table">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-muted-foreground" />
                Action Breakdown by Street
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-medium">Street</th>
                      <th className="text-left py-2 px-3 font-medium">Position</th>
                      <th className="text-left py-2 px-3 font-medium">Hero Action</th>
                      <th className="text-left py-2 px-3 font-medium">Villain</th>
                      <th className="text-right py-2 px-3 font-medium">Pot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spot.actions.map((action, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-2 px-3 capitalize font-medium">{action.street}</td>
                        <td className="py-2 px-3 text-muted-foreground">{action.heroPosition} vs {action.villainPosition}</td>
                        <td className="py-2 px-3 font-medium text-primary">{action.heroAction}</td>
                        <td className="py-2 px-3 text-muted-foreground">{action.villainAction}</td>
                        <td className="py-2 px-3 text-right text-muted-foreground">{action.potAfter || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/5" data-testid="card-ai-solution">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Solution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={`text-base px-3 py-1 uppercase font-bold ${actionColors[spot.aiSolution.recommendation] || ""}`}>
                  {spot.aiSolution.recommendation}
                </Badge>
                {spot.aiSolution.frequency && (
                  <span className="text-sm text-muted-foreground">
                    Frequency: <span className="font-medium text-foreground">{spot.aiSolution.frequency}</span>
                  </span>
                )}
              </div>
              <p className="text-muted-foreground" data-testid="text-ai-reasoning">{spot.aiSolution.reasoning}</p>
            </CardContent>
          </Card>

          {spot.exploitAdjustment && (
            <Card data-testid="card-exploits">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  Exploitative Adjustments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {spot.exploitAdjustment.vsTight && (
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium mb-1">vs Tight Players</p>
                      <p className="text-sm text-muted-foreground">{spot.exploitAdjustment.vsTight}</p>
                    </div>
                  )}
                  {spot.exploitAdjustment.vsLoose && (
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium mb-1">vs Loose Players</p>
                      <p className="text-sm text-muted-foreground">{spot.exploitAdjustment.vsLoose}</p>
                    </div>
                  )}
                  {spot.exploitAdjustment.vsPassive && (
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium mb-1">vs Passive Players</p>
                      <p className="text-sm text-muted-foreground">{spot.exploitAdjustment.vsPassive}</p>
                    </div>
                  )}
                  {spot.exploitAdjustment.vsAggressive && (
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium mb-1">vs Aggressive Players</p>
                      <p className="text-sm text-muted-foreground">{spot.exploitAdjustment.vsAggressive}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {spot.relatedWikiTerms.length > 0 && (
            <Card data-testid="card-related-terms">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                  Related Concepts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {spot.relatedWikiTerms.map((term) => (
                    <Link key={term} href={`/wiki/${term}`}>
                      <Badge variant="outline" className="cursor-pointer hover-elevate" data-testid={`link-wiki-${term}`}>
                        {term.replace(/-/g, " ")}
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-wrap gap-2">
            {spot.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          <Card className="bg-muted/50">
            <CardContent className="py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Practice This Spot
                  </h3>
                  <p className="text-sm text-muted-foreground">Test your understanding with our AI analyzer or quiz.</p>
                </div>
                <div className="flex gap-2">
                  <Link href="/quiz">
                    <Button variant="outline" data-testid="button-practice-quiz">
                      Quiz Trainer
                    </Button>
                  </Link>
                  <Link href="/app">
                    <Button data-testid="button-analyze">
                      Analyze Hand
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Link href="/spots">
              <Button variant="outline" data-testid="button-back-spots">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Spots
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
