import { useEffect } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Spade, 
  ArrowLeft,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "What poker variants does Poker Coach support?",
      answer: "Poker Coach works best with Texas Hold'em screenshots from popular online poker platforms. The AI can recognize most standard table layouts and card designs."
    },
    {
      question: "How accurate are the recommendations?",
      answer: "Our AI provides solid fundamental strategy recommendations. While no tool can guarantee winning, our analysis helps you understand GTO concepts and improve your decision-making over time."
    },
    {
      question: "Is my data secure?",
      answer: "Yes. Screenshots are processed in real-time and are not permanently stored. We don't track your poker results or share any data with third parties."
    },
    {
      question: "Can I use this during live play?",
      answer: "Poker Coach is designed as a training and review tool. Please check your poker platform's terms of service regarding third-party assistance during play."
    },
    {
      question: "Is there a browser extension?",
      answer: "Yes! We offer extensions for both Chrome and Firefox. They let you capture and analyze hands with a single hotkey (Ctrl+Shift+P). The recommendation appears as an overlay directly in your browser."
    }
  ];

  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faqpage-schema';
    script.text = JSON.stringify(faqSchema);
    
    const existing = document.getElementById('faqpage-schema');
    if (existing) {
      existing.remove();
    }
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('faqpage-schema');
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>FAQ - Poker Coach AI</title>
        <meta name="description" content="Frequently asked questions about Poker Coach AI. Learn about supported poker variants, accuracy, data security, and browser extensions." />
        <link rel="canonical" href="https://poker-coach-ai.replit.app/faq" />
      </Helmet>

      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center" data-testid="icon-logo">
                  <Spade className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xl font-bold" data-testid="text-brand">Poker Coach</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/app">
              <Button data-testid="button-launch-app">
                Launch App
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <Link href="/">
            <Button variant="ghost" className="mb-6" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-faq-title">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about Poker Coach.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} data-testid={`card-faq-${index}`}>
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h2 className="font-semibold mb-2">{faq.question}</h2>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Link href="/support">
              <Button variant="outline" data-testid="button-contact-support">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
