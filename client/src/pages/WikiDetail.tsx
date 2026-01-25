import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Calculator, FileText, Link2, Spade } from "lucide-react";
import { wikiTerms } from "@/data/wiki-terms";
import { Helmet } from "react-helmet-async";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";

const categoryLabels: Record<string, string> = {
  basics: "Basics",
  strategy: "Strategy",
  math: "Math & Odds",
  positions: "Positions",
  actions: "Actions",
};

export default function WikiDetail() {
  const [, params] = useRoute("/wiki/:slug");
  const term = wikiTerms.find(t => t.slug === params?.slug);

  if (!term) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-8 text-center">
            <h1 className="text-xl font-semibold mb-2">Term not found</h1>
            <p className="text-muted-foreground mb-4">The requested glossary term doesn't exist.</p>
            <Link href="/wiki">
              <Button>Back to Glossary</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedTermObjects = term.relatedTerms
    .map(slug => wikiTerms.find(t => t.slug === slug))
    .filter(Boolean);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": term.term,
    "description": term.definition,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Poker Glossary",
      "url": "https://poker-coach-ai.replit.app/wiki"
    }
  };

  return (
    <>
      <Helmet>
        <title>{term.term} - Poker Glossary | Poker Coach AI</title>
        <meta name="description" content={`${term.definition} Learn about ${term.term} with examples and related poker concepts.`} />
        <link rel="canonical" href={`https://poker-coach-ai.replit.app/wiki/${term.slug}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container max-w-4xl mx-auto flex h-14 items-center justify-between gap-4 px-4">
            <div className="flex items-center gap-3">
              <Link href="/wiki">
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
        <div className="container mx-auto px-4 py-8 max-w-3xl">

          <article>
            <header className="mb-6">
              <Badge variant="outline" className="mb-2">{categoryLabels[term.category]}</Badge>
              <h1 className="text-3xl font-bold">{term.term}</h1>
            </header>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Definition</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">{term.definition}</p>
              </CardContent>
            </Card>

            {term.formula && (
              <Card className="mb-6 border-primary/30 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Formula / Rule</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <code className="text-base bg-background px-3 py-2 rounded block">
                    {term.formula}
                  </code>
                </CardContent>
              </Card>
            )}

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Example</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">{term.example}</p>
              </CardContent>
            </Card>

            {relatedTermObjects.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Link2 className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Related Terms</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {relatedTermObjects.map(related => related && (
                      <Link key={related.slug} href={`/wiki/${related.slug}`}>
                        <Badge variant="outline" className="hover-elevate cursor-pointer">
                          {related.term}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </article>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-6 text-center">
              <h2 className="text-lg font-semibold mb-2">Apply {term.term} in Practice</h2>
              <p className="text-muted-foreground mb-4">
                See how this concept applies to real hands with AI analysis
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
