import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Spade, 
  Zap, 
  Upload, 
  Brain, 
  Target,
  Clock,
  Shield,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Chrome,
  Keyboard,
  MonitorPlay,
  Download
} from "lucide-react";

export default function Landing() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced vision AI instantly recognizes your hole cards, community cards, pot size, and opponent actions from any poker screenshot."
    },
    {
      icon: Target,
      title: "Precise Recommendations",
      description: "Get clear action recommendations - FOLD, CHECK, CALL, RAISE, or ALL-IN - with detailed strategic reasoning for each decision."
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Receive analysis in seconds. Perfect for reviewing hands after sessions or learning optimal play in real-time situations."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your screenshots are processed securely and never stored permanently. Your poker data stays private."
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Capture Your Hand",
      description: "Take a screenshot of your poker game showing your cards, the board, pot size, and any opponent actions."
    },
    {
      step: 2,
      title: "Upload to Poker Coach",
      description: "Drag and drop your screenshot or paste it directly. Our AI accepts PNG, JPG, and WebP formats."
    },
    {
      step: 3,
      title: "Get Expert Analysis",
      description: "Within seconds, receive a professional recommendation with detailed reasoning explaining the optimal play."
    }
  ];

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
      question: "Is there a Chrome extension?",
      answer: "Yes! Our Chrome extension lets you capture and analyze hands with a single hotkey (Ctrl+Shift+P). The recommendation appears as an overlay directly in your browser."
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
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center" data-testid="icon-logo">
              <Spade className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold" data-testid="text-brand">Poker Coach</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-features">Features</a>
            <Link href="/quiz">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-quiz">Quiz</span>
            </Link>
            <Link href="/ranges">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-ranges">Ranges</span>
            </Link>
            <Link href="/spots">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-spots">Spots</span>
            </Link>
            <Link href="/hands">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-hands">Hands</span>
            </Link>
            <Link href="/wiki">
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-wiki">Wiki</span>
            </Link>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-faq">FAQ</a>
          </nav>
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
        <section className="py-20 md:py-32" data-testid="section-hero">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="secondary" className="mb-6" data-testid="badge-hero">
                <Zap className="w-3 h-3 mr-1" />
                AI-Powered Poker Training
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
                Improve Your Poker Game with AI Analysis
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-description">
                Upload screenshots of your poker hands and get instant, expert-level recommendations. 
                Our AI analyzes your position, cards, pot odds, and opponent actions to suggest the optimal play.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/app">
                  <Button size="lg" className="w-full sm:w-auto" data-testid="button-try-free">
                    <Upload className="w-5 h-5 mr-2" />
                    Try It Free
                  </Button>
                </Link>
                <Link href="/guide">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-learn-more">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/30" data-testid="section-features">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-features-title">
                Why Choose Poker Coach?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered tool helps you make better decisions at the poker table by analyzing real game situations.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-background" data-testid={`card-feature-${index}`}>
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20" data-testid="section-how-it-works">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-how-title">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Getting poker advice has never been easier. Three simple steps to better play.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="text-center" data-testid={`step-${index}`}>
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                  {index < howItWorks.length - 1 && (
                    <ChevronRight className="w-8 h-8 text-muted-foreground/30 mx-auto mt-6 hidden md:block rotate-0 md:rotate-0" />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/app">
                <Button size="lg" data-testid="button-start-analyzing">
                  Start Analyzing Hands
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="extension" className="py-20 bg-muted/30" data-testid="section-extension">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <Chrome className="w-3 h-3 mr-1" />
                  Browser Extension
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-extension-title">
                  Analyze Hands Instantly with Our Chrome Extension
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  No need to switch tabs or upload files. Press a hotkey and get AI recommendations 
                  displayed as an overlay directly in your browser window.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Keyboard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">One-Key Capture</h3>
                      <p className="text-sm text-muted-foreground">Press Ctrl+Shift+P to instantly capture and analyze your current hand.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MonitorPlay className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">In-Browser Overlay</h3>
                      <p className="text-sm text-muted-foreground">Recommendations appear as a sleek overlay without leaving your poker table.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Lightning Fast</h3>
                      <p className="text-sm text-muted-foreground">Get results in seconds - perfect for hand reviews and training sessions.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" data-testid="button-download-zip" asChild>
                    <a href="/api/extension/download" download="poker-coach-extension.zip">
                      <Download className="w-5 h-5 mr-2" />
                      Download Extension
                    </a>
                  </Button>
                  <Link href="/extension-guide">
                    <Button size="lg" variant="outline" data-testid="button-extension-guide">
                      <HelpCircle className="w-5 h-5 mr-2" />
                      Installation Guide
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <Card className="bg-background border-2">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
                        <Spade className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="font-bold text-xl">Poker Coach Extension</h3>
                      <p className="text-sm text-muted-foreground">Chrome Browser Extension</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4 mb-4">
                      <div className="text-xs text-muted-foreground mb-2">Hotkey</div>
                      <div className="flex items-center justify-center gap-1">
                        <kbd className="px-2 py-1 bg-background rounded text-sm font-mono border">Ctrl</kbd>
                        <span className="text-muted-foreground">+</span>
                        <kbd className="px-2 py-1 bg-background rounded text-sm font-mono border">Shift</kbd>
                        <span className="text-muted-foreground">+</span>
                        <kbd className="px-2 py-1 bg-background rounded text-sm font-mono border">P</kbd>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      Works with all major online poker platforms
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground" data-testid="section-cta">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Improve Your Game?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of players using AI to make smarter poker decisions.
            </p>
            <Link href="/app">
              <Button size="lg" variant="secondary" data-testid="button-cta">
                <Spade className="w-5 h-5 mr-2" />
                Launch Poker Coach
              </Button>
            </Link>
          </div>
        </section>

        <section id="faq" className="py-20" data-testid="section-faq">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-faq-title">
                Frequently Asked Questions
              </h2>
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
                        <h3 className="font-semibold mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
