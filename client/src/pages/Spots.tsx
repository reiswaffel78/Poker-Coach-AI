import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useBreadcrumbSchema } from "@/hooks/useBreadcrumbSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target,
  Layers,
  TrendingUp,
  CircleDot,
  Filter,
  ChevronRight
} from "lucide-react";
import { pokerSpots, type SpotCategory, type PokerSpot } from "@/data/poker-spots";

const categoryConfig: Record<SpotCategory, { label: string; icon: typeof Target; color: string }> = {
  preflop: { label: "Preflop", icon: CircleDot, color: "bg-primary" },
  flop: { label: "Flop", icon: Layers, color: "bg-accent" },
  turn: { label: "Turn", icon: TrendingUp, color: "bg-secondary" },
  river: { label: "River", icon: Target, color: "bg-destructive" }
};

const difficultyColors: Record<PokerSpot["difficulty"], string> = {
  beginner: "bg-accent/20 text-accent-foreground",
  intermediate: "bg-secondary text-secondary-foreground",
  advanced: "bg-destructive/20 text-destructive"
};

export default function Spots() {
  const [activeCategory, setActiveCategory] = useState<SpotCategory | "all">("all");
  
  useBreadcrumbSchema([{ name: "Poker Spots", path: "/spots" }]);

  const filteredSpots = activeCategory === "all" 
    ? pokerSpots 
    : pokerSpots.filter(spot => spot.category === activeCategory);

  const spotsByCategory = {
    preflop: pokerSpots.filter(s => s.category === "preflop"),
    flop: pokerSpots.filter(s => s.category === "flop"),
    turn: pokerSpots.filter(s => s.category === "turn"),
    river: pokerSpots.filter(s => s.category === "river")
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Poker Spots Analysis | Common Scenarios & GTO Solutions</title>
        <meta name="description" content="Learn optimal plays for common poker spots. Explore preflop, flop, turn, and river scenarios with detailed action breakdowns and AI-powered solutions." />
        <link rel="canonical" href="https://poker-coach-ai.replit.app/spots" />
        <meta property="og:title" content="Poker Spots Analysis | Common Scenarios & GTO Solutions" />
        <meta property="og:description" content="Learn optimal plays for common poker spots. Explore preflop, flop, turn, and river scenarios with detailed action breakdowns and AI-powered solutions." />
        <meta property="og:url" content="https://poker-coach-ai.replit.app/spots" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://poker-coach-ai.replit.app/og-image.png" />
      </Helmet>

      <Header />

      <main className="container px-4 py-8 max-w-4xl mx-auto flex-1" data-testid="container-spots">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2" data-testid="text-spots-title">Poker Spot Analysis</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Master common poker situations with detailed breakdowns, GTO solutions, and exploitative adjustments. 
              Each spot includes action tables and AI-powered recommendations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by street:</span>
            </div>
            <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as SpotCategory | "all")}>
              <TabsList>
                <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
                <TabsTrigger value="preflop" data-testid="tab-preflop">Preflop</TabsTrigger>
                <TabsTrigger value="flop" data-testid="tab-flop">Flop</TabsTrigger>
                <TabsTrigger value="turn" data-testid="tab-turn">Turn</TabsTrigger>
                <TabsTrigger value="river" data-testid="tab-river">River</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {activeCategory === "all" ? (
            Object.entries(spotsByCategory).map(([category, spots]) => (
              spots.length > 0 && (
                <div key={category} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${categoryConfig[category as SpotCategory].color}`} />
                    <h3 className="text-lg font-semibold capitalize" data-testid={`heading-category-${category}`}>
                      {categoryConfig[category as SpotCategory].label} Spots
                    </h3>
                    <Badge variant="secondary" className="text-xs">{spots.length}</Badge>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {spots.map((spot) => (
                      <SpotCard key={spot.slug} spot={spot} />
                    ))}
                  </div>
                </div>
              )
            ))
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredSpots.map((spot) => (
                <SpotCard key={spot.slug} spot={spot} />
              ))}
            </div>
          )}

          {filteredSpots.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No spots found for this category.
            </div>
          )}

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">Practice These Spots</h3>
                  <p className="text-sm text-muted-foreground">Test your knowledge with our interactive quiz trainer.</p>
                </div>
                <Link href="/quiz">
                  <Button data-testid="button-go-quiz">
                    Go to Quiz
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SpotCard({ spot }: { spot: PokerSpot }) {
  const config = categoryConfig[spot.category];
  const CategoryIcon = config.icon;

  return (
    <Link href={`/spots/${spot.slug}`}>
      <Card className="h-full hover-elevate cursor-pointer transition-all" data-testid={`card-spot-${spot.slug}`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-md ${config.color} flex items-center justify-center`}>
                <CategoryIcon className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-base leading-tight">{spot.title}</CardTitle>
                {spot.heroHand && (
                  <p className="text-xs text-muted-foreground mt-0.5">{spot.heroHand}</p>
                )}
              </div>
            </div>
            <Badge variant="outline" className={`text-xs shrink-0 ${difficultyColors[spot.difficulty]}`}>
              {spot.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">{spot.description}</p>
          <div className="flex flex-wrap gap-1 mt-3">
            {spot.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
