import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Brain, AlertTriangle, Lightbulb, Calendar, Spade } from "lucide-react";
import { handsOfTheDay } from "@/data/hands-of-the-day";
import { Helmet } from "react-helmet-async";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";

export default function HandDetail() {
  const [, params] = useRoute("/hands/:slug");
  const hand = handsOfTheDay.find(h => h.slug === params?.slug);

  if (!hand) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-8 text-center">
            <h1 className="text-xl font-semibold mb-2">Hand not found</h1>
            <p className="text-muted-foreground mb-4">The requested hand analysis doesn't exist.</p>
            <Link href="/hands">
              <Button>Back to Hands</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Hand of the Day: ${hand.title}`,
    "description": hand.summary,
    "datePublished": hand.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Poker Coach AI"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Poker Coach AI",
      "url": "https://poker-coach-ai.replit.app"
    }
  };

  return (
    <>
      <Helmet>
        <title>Hand of the Day: {hand.title} | Poker Coach AI</title>
        <meta name="description" content={hand.summary} />
        <link rel="canonical" href={`https://poker-coach-ai.replit.app/hands/${hand.slug}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container max-w-4xl mx-auto flex h-14 items-center justify-between gap-4 px-4">
            <div className="flex items-center gap-3">
              <Link href="/hands">
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
          <Link href="/hands">
            <Button variant="ghost" className="mb-4 gap-2" data-testid="button-back-hands">
              <ArrowLeft className="h-4 w-4" /> All Hands
            </Button>
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Hand of the Day: {hand.spot}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Calendar className="h-4 w-4" />
                <time dateTime={hand.publishedAt}>
                  {new Date(hand.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
              </div>
              <p className="text-lg text-muted-foreground">{hand.summary}</p>
            </header>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Hand Context</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Stakes</p>
                    <p className="font-medium">{hand.stakes}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hero Position</p>
                    <p className="font-medium">{hand.heroPosition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hero Cards</p>
                    <Badge variant="default" className="mt-1">{hand.heroCards}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Villain Position</p>
                    <p className="font-medium">{hand.villainPosition}</p>
                  </div>
                </div>
                {hand.communityCards && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Community Cards</p>
                    <Badge variant="outline" className="mt-1 text-base">{hand.communityCards}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Action Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Street</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead className="w-24 text-right">Pot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hand.actions.map((action, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{action.street}</TableCell>
                        <TableCell>{action.action}</TableCell>
                        <TableCell className="text-right">{action.potAfter || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="mb-6 border-primary/50 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">AI Recommendation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="text-lg px-4 py-1" data-testid="badge-ai-recommendation">{hand.aiRecommendation}</Badge>
                </div>
                <p className="text-foreground leading-relaxed">{hand.aiReasoning}</p>

                <div className="mt-6">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" /> Alternative Lines
                  </h4>
                  <div className="space-y-2">
                    {hand.alternatives.map((alt, idx) => (
                      <div key={idx} className="p-3 bg-background rounded-md border">
                        <Badge variant="outline" className="mb-1">{alt.action}</Badge>
                        <p className="text-sm text-muted-foreground">{alt.reasoning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert variant="destructive" className="mb-6 border-yellow-500/50 bg-yellow-500/10 text-foreground">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertTitle className="text-yellow-700 dark:text-yellow-400">Common Mistakes</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  {hand.commonMistakes.map((mistake, idx) => (
                    <li key={idx}>{mistake}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </article>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-6 text-center">
              <h2 className="text-lg font-semibold mb-2">Practice Similar Spots</h2>
              <p className="text-muted-foreground mb-4">
                Upload your own screenshots and get instant AI recommendations
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
