import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ChevronRight } from "lucide-react";
import { wikiTerms } from "@/data/wiki-terms";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const categoryLabels: Record<string, string> = {
  basics: "Basics",
  strategy: "Strategy",
  math: "Math & Odds",
  positions: "Positions",
  actions: "Actions",
};

export default function Wiki() {
  const groupedTerms = wikiTerms.reduce((acc, term) => {
    const firstLetter = term.term[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(term);
    return acc;
  }, {} as Record<string, typeof wikiTerms>);

  const sortedLetters = Object.keys(groupedTerms).sort();

  return (
    <>
      <Helmet>
        <title>Poker Glossary & Wiki | Poker Coach AI</title>
        <meta name="description" content="Comprehensive poker glossary with definitions, formulas, and examples. Learn poker terms from pot odds to 3-bet with our AI-powered reference guide." />
        <link rel="canonical" href="https://poker-coach-ai.replit.app/wiki" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Poker Glossary</h1>
            <p className="text-muted-foreground">
              Essential poker terms explained with definitions, formulas, and practical examples.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {sortedLetters.map(letter => (
              <a key={letter} href={`#letter-${letter}`}>
                <Button variant="outline" size="sm" data-testid={`button-letter-${letter}`}>{letter}</Button>
              </a>
            ))}
          </div>

          <div className="space-y-8">
            {sortedLetters.map(letter => (
              <section key={letter} id={`letter-${letter}`}>
                <h2 className="text-2xl font-bold mb-4 border-b pb-2">{letter}</h2>
                <div className="space-y-3">
                  {groupedTerms[letter].map(term => (
                    <Link key={term.slug} href={`/wiki/${term.slug}`}>
                      <Card className="hover-elevate cursor-pointer" data-testid={`card-term-${term.slug}`}>
                        <CardContent className="py-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{term.term}</h3>
                                <Badge variant="secondary" data-testid={`badge-category-${term.slug}`}>
                                  {categoryLabels[term.category]}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">{term.definition}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="py-8">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h2 className="text-xl font-semibold mb-2">Apply Your Knowledge</h2>
                <p className="text-muted-foreground mb-4">
                  Practice these concepts with real hand analysis
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
