import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, Users, Trophy, Lightbulb, Calendar, Spade } from "lucide-react";
import { famousHands } from "@/data/famous-hands";
import { Helmet } from "react-helmet-async";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";

export default function FamousHandDetail() {
  const [, params] = useRoute("/famous-hands/:slug");
  const hand = famousHands.find(h => h.slug === params?.slug);

  if (!hand) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-8 text-center">
            <h1 className="text-xl font-semibold mb-2">Hand not found</h1>
            <p className="text-muted-foreground mb-4">The requested famous hand doesn't exist.</p>
            <Link href="/famous-hands">
              <Button>Back to Famous Hands</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": hand.title,
    "description": hand.summary,
    "datePublished": `${hand.year}-01-01`,
    "author": {
      "@type": "Organization",
      "name": "Poker Coach AI"
    }
  };

  return (
    <>
      <Helmet>
        <title>{hand.title} | Human vs AI | Poker Coach AI</title>
        <meta name="description" content={`${hand.summary} Compare human decision vs AI recommendation in this legendary poker moment.`} />
        <link rel="canonical" href={`https://poker-coach-ai.replit.app/famous-hands/${hand.slug}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container max-w-4xl mx-auto flex h-14 items-center justify-between gap-4 px-4">
            <div className="flex items-center gap-3">
              <Link href="/famous-hands">
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

          <article>
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{hand.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mb-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {hand.year}
                </span>
                <span>{hand.event}</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{hand.players.join(" vs ")}</span>
              </div>
              <p className="text-lg text-muted-foreground">{hand.summary}</p>
            </header>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg">Human Decision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="mb-3" data-testid="badge-human-decision">{hand.humanDecision}</Badge>
                  <p className="text-muted-foreground leading-relaxed">{hand.humanReasoning}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">AI Recommendation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="default" className="mb-3" data-testid="badge-ai-recommendation">{hand.aiRecommendation}</Badge>
                  <p className="text-muted-foreground leading-relaxed">{hand.aiReasoning}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Verdict</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed" data-testid="text-verdict">{hand.verdict}</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Key Lesson</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{hand.lesson}</p>
              </CardContent>
            </Card>
          </article>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-6 text-center">
              <h2 className="text-lg font-semibold mb-2">Analyze Your Own Hands</h2>
              <p className="text-muted-foreground mb-4">
                Get instant AI recommendations on your poker screenshots
              </p>
              <Link href="/app">
                <Button data-testid="button-try-trainer">Try the Poker Trainer</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
