import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Coffee, Code, Server, Sparkles, Mail } from "lucide-react";
import { SiPaypal } from "react-icons/si";

export default function Support() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Support Us | Poker Coach AI</title>
        <meta name="description" content="Support Poker Coach AI - a hobby project built by one developer. Your donations help cover server costs and keep the project running." />
        <link rel="canonical" href="https://poker-coach-ai.replit.app/support" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="container px-4 py-8 max-w-3xl mx-auto flex-1" data-testid="container-support">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold" data-testid="text-support-title">Support Poker Coach AI</h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Thank you for considering supporting this project!
              </p>
            </div>

            <Card data-testid="card-about">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-muted-foreground" />
                  About This Project
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Poker Coach AI is a <strong className="text-foreground">hobby project</strong> created and maintained by a single developer in my spare time. What started as a personal tool to improve my own poker game has grown into something I'm proud to share with the community.
                </p>
                <p>
                  This is not a commercial venture backed by a company or investors. It's just me, a poker enthusiast and software developer, building something I find useful and hoping others will too.
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-costs">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-muted-foreground" />
                  What Your Support Covers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Server className="w-3 h-3 text-primary" />
                    </div>
                    <span><strong className="text-foreground">Server & Hosting:</strong> Keeping the app online and responsive 24/7</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <span><strong className="text-foreground">AI API Costs:</strong> The AI analysis requires API calls that have usage costs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Code className="w-3 h-3 text-primary" />
                    </div>
                    <span><strong className="text-foreground">Development Time:</strong> Adding new features, fixing bugs, and improving the experience</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5" data-testid="card-donate">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Coffee className="w-10 h-10 text-primary mx-auto" />
                  <h2 className="text-xl font-semibold">Buy Me a Coffee</h2>
                  <p className="text-muted-foreground">
                    If you find Poker Coach AI helpful, consider buying me a coffee. Every contribution, no matter how small, helps keep this project alive.
                  </p>
                  <Button size="lg" className="gap-2" asChild data-testid="button-paypal">
                    <a
                      href="https://paypal.me/pokercoachai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiPaypal className="w-5 h-5" />
                      Donate via PayPal
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-muted-foreground text-sm space-y-2" data-testid="text-thanks">
              <p>
                Even if you can't donate, you can still help by sharing the tool with other poker players!
              </p>
              <p className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Questions or feedback? <a href="mailto:pokercoachai@proton.me" className="text-primary hover:underline" data-testid="link-support-email">pokercoachai@proton.me</a>
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
