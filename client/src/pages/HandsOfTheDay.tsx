import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight, TrendingUp, Spade, ArrowLeft } from "lucide-react";
import { handsOfTheDay } from "@/data/hands-of-the-day";
import { Helmet } from "react-helmet-async";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";

export default function HandsOfTheDay() {
  return (
    <>
      <Helmet>
        <title>Hand of the Day | Poker Coach AI</title>
        <meta name="description" content="Daily poker hand analysis with AI recommendations. Learn from real spots with detailed breakdowns of optimal plays, common mistakes, and strategic insights." />
        <link rel="canonical" href="https://poker-coach-ai.replit.app/hands" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container max-w-4xl mx-auto flex h-14 items-center justify-between gap-4 px-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon" data-testid="button-back">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center" data-testid="icon-logo">
                    <Spade className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="text-lg font-semibold leading-none" data-testid="text-brand">Poker Coach</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Hand of the Day</h1>
            <p className="text-muted-foreground">
              Daily poker hand analysis with AI-powered recommendations. Learn from real spots and improve your game.
            </p>
          </div>

          <div className="space-y-4">
            {handsOfTheDay.map((hand) => (
              <Link key={hand.slug} href={`/hands/${hand.slug}`}>
                <Card className="hover-elevate cursor-pointer transition-all" data-testid={`card-hand-${hand.slug}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <CardTitle className="text-xl">{hand.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(hand.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                      <Badge variant="default" data-testid={`badge-recommendation-${hand.slug}`}>
                        {hand.aiRecommendation}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{hand.summary}</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" data-testid={`badge-cards-${hand.slug}`}>{hand.heroCards}</Badge>
                        <Badge variant="outline" data-testid={`badge-spot-${hand.slug}`}>{hand.spot}</Badge>
                        <Badge variant="outline" data-testid={`badge-stakes-${hand.slug}`}>{hand.stakes}</Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1" data-testid={`button-read-${hand.slug}`}>
                        Read Analysis <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="py-8">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h2 className="text-xl font-semibold mb-2">Practice These Spots</h2>
                <p className="text-muted-foreground mb-4">
                  Upload your own poker screenshots and get instant AI analysis
                </p>
                <Link href="/app">
                  <Button data-testid="button-try-trainer">Try the Poker Trainer</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
