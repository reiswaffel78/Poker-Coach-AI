import { useEffect } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Spade, 
  ArrowLeft,
  ArrowRight,
  HelpCircle
} from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "What poker variants does Poker Coach support?",
      answer: "Poker Coach works best with Texas Hold'em screenshots from popular online poker platforms. The AI can recognize most standard table layouts and card designs."
    },
    {
      question: "How accurate are the recommendations?",
      answer: "Our AI provides solid fundamental strategy recommendations based on GTO (Game Theory Optimal) principles. While no tool can guarantee winning, our analysis helps you understand optimal play and improve your decision-making over time."
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
    },
    {
      question: "What information does the AI extract from screenshots?",
      answer: "The AI identifies your hole cards, community cards, pot size, stack sizes, your position at the table, betting action, and opponent actions to provide context-aware recommendations."
    },
    {
      question: "Does Poker Coach work with all online poker sites?",
      answer: "Poker Coach works with most major online poker platforms including PokerStars, GGPoker, 888poker, PartyPoker, and many others. The AI is trained to recognize various table themes and card designs."
    },
    {
      question: "What is GTO and why does it matter?",
      answer: "GTO (Game Theory Optimal) is a balanced poker strategy that is unexploitable in the long run. Our AI uses GTO principles to suggest plays that maximize expected value while minimizing exploitable weaknesses in your game."
    },
    {
      question: "How is this different from other poker tools?",
      answer: "Unlike traditional poker calculators that require manual input, Poker Coach uses AI vision to instantly read your game state from a screenshot. This makes analysis faster and more convenient, especially for hand reviews."
    },
    {
      question: "Can Poker Coach help me with tournament play?",
      answer: "Yes! The AI considers stack sizes and pot odds which are crucial for tournament decisions. However, it currently focuses on hand-by-hand analysis rather than ICM (Independent Chip Model) calculations."
    },
    {
      question: "What is 'Roast Mode'?",
      answer: "Roast Mode is our fun alternative analysis style where the AI delivers feedback with humor and personality, similar to famous poker commentators. It's educational but entertaining - perfect for sharing with friends!"
    },
    {
      question: "How do I get better at reading opponents?",
      answer: "While Poker Coach focuses on GTO strategy, learning to read opponents comes from experience. Use our tool to master fundamentals first, then you can start exploiting opponent tendencies once you understand optimal play."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, Poker Coach is available as a web application that works on all devices including mobile browsers. Simply visit our site on your phone or tablet to analyze hands on the go."
    },
    {
      question: "What does the hand range matrix show?",
      answer: "The hand range matrix (available in the Ranges section) displays the 169 possible starting hand combinations in Texas Hold'em. It helps you visualize which hands to play from each position."
    },
    {
      question: "How can I improve my poker skills beyond using this tool?",
      answer: "We recommend using Poker Coach alongside studying poker theory, watching training videos, reviewing your own hand histories, and practicing regularly. Our Quiz section offers interactive scenarios to test your knowledge."
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
        <meta name="description" content="Frequently asked questions about Poker Coach AI. Learn about supported poker variants, accuracy, data security, GTO strategy, and browser extensions." />
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

          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-faq-title">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about Poker Coach.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
                    <AccordionTrigger className="text-left" data-testid={`faq-trigger-${index}`}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent data-testid={`faq-content-${index}`}>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

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
