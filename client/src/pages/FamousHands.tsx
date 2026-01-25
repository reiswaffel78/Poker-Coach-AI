import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight, Users, Brain } from "lucide-react";
import { famousHands } from "@/data/famous-hands";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function FamousHands() {
  return (
    <>
      <Helmet>
        <title>Famous Poker Hands: Human vs AI | Poker Coach AI</title>
        <meta name="description" content="Analyze legendary poker hands from a new perspective. See how AI would have played famous spots and learn from the greatest moments in poker history." />
        <link rel="canonical" href="https://poker-coach-ai.replit.app/famous-hands" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Human vs Machine</h1>
            <p className="text-muted-foreground">
              Legendary poker hands analyzed from a new perspective. How would AI have played these famous spots?
            </p>
          </div>

          <div className="space-y-4">
            {famousHands.map((hand) => (
              <Link key={hand.slug} href={`/famous-hands/${hand.slug}`}>
                <Card className="hover-elevate cursor-pointer" data-testid={`card-famous-${hand.slug}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <CardTitle className="text-xl">{hand.title}</CardTitle>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" /> {hand.year}
                          </span>
                          <span>{hand.event}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{hand.summary}</p>
                    
                    <div className="flex items-center gap-4 mb-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{hand.players.join(" vs ")}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" className="gap-1" data-testid={`badge-human-${hand.slug}`}>
                          <Users className="h-3 w-3" /> Human: {hand.humanDecision}
                        </Badge>
                        <Badge variant="default" className="gap-1" data-testid={`badge-ai-${hand.slug}`}>
                          <Brain className="h-3 w-3" /> AI: {hand.aiRecommendation}
                        </Badge>
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
                <Brain className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h2 className="text-xl font-semibold mb-2">Get Your Own AI Analysis</h2>
                <p className="text-muted-foreground mb-4">
                  Upload your poker screenshots and see what the AI recommends
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
