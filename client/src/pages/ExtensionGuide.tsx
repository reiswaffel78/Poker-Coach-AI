import { useEffect } from "react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { useBreadcrumbSchema } from "@/hooks/useBreadcrumbSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Spade,
  ArrowLeft,
  Chrome,
  Download,
  Settings,
  Keyboard,
  CheckCircle2,
  AlertCircle,
  FolderOpen,
  ToggleLeft,
  FolderArchive,
  MousePointer
} from "lucide-react";

export default function ExtensionGuide() {
  useBreadcrumbSchema([{ name: "Extension Installation Guide", path: "/extension-guide" }]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const steps = [
    {
      number: 1,
      title: "Download the Extension",
      description: "Click the \"Download Extension (ZIP)\" button above to download the extension files as a ZIP archive to your computer.",
      icon: Download,
      details: null
    },
    {
      number: 2,
      title: "Extract the ZIP File",
      description: "Find the downloaded file (poker-coach-extension.zip) in your Downloads folder. Right-click on it and select \"Extract All\" (Windows) or double-click to unzip (Mac). Remember where you extract it - you'll need this folder in Step 5.",
      icon: FolderArchive,
      details: "The extracted folder should contain files like manifest.json, background.js, popup.html, etc."
    },
    {
      number: 3,
      title: "Open Chrome Extensions Page",
      description: "Open Google Chrome and type chrome://extensions in the address bar, then press Enter. Alternatively, click the three dots menu in Chrome, go to \"More Tools\", then click \"Extensions\".",
      icon: Chrome,
      details: null
    },
    {
      number: 4,
      title: "Enable Developer Mode",
      description: "On the Extensions page, look for the \"Developer mode\" toggle in the top-right corner. Click it to turn it ON. This is required to install extensions that aren't from the Chrome Web Store.",
      icon: ToggleLeft,
      details: "When enabled, you'll see additional buttons appear: \"Load unpacked\", \"Pack extension\", and \"Update\"."
    },
    {
      number: 5,
      title: "Load the Extension",
      description: "Click the \"Load unpacked\" button that appeared after enabling Developer Mode. A file browser will open - navigate to the folder where you extracted the ZIP file (the folder containing manifest.json) and select it.",
      icon: FolderOpen,
      details: "Select the folder named \"poker-coach-extension\" that was created when you extracted the ZIP."
    },
    {
      number: 6,
      title: "Pin the Extension",
      description: "After loading, the Poker Coach extension will appear in your extensions list. Click the puzzle piece icon in Chrome's toolbar, then click the pin icon next to \"Poker Coach\" to keep it visible in your toolbar.",
      icon: MousePointer,
      details: null
    },
    {
      number: 7,
      title: "Configure the API URL",
      description: "Click the Poker Coach extension icon in your toolbar. In the popup, you'll see a settings field for the API URL. Enter: https://poker-coach-ai.replit.app and click Save.",
      icon: Settings,
      details: "This connects the extension to our analysis server. Without this, the extension won't be able to analyze your screenshots."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-4xl mx-auto flex h-14 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center" data-testid="icon-logo">
                  <Spade className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold" data-testid="text-brand">Poker Coach</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 max-w-4xl mx-auto flex-1">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            <Chrome className="w-3 h-3 mr-1" />
            Browser Extension
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-page-title">
            Chrome Extension Installation Guide
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Follow these steps to install the Poker Coach Chrome extension and start analyzing hands with a single hotkey.
          </p>
          <Button size="lg" data-testid="button-download-zip" asChild>
            <a href="/api/extension/download" download="poker-coach-extension.zip">
              <Download className="w-5 h-5 mr-2" />
              Download Extension (ZIP)
            </a>
          </Button>
        </div>

        <div className="space-y-6 mb-12">
          {steps.map((step) => (
            <Card key={step.number} data-testid={`card-step-${step.number}`}>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold shrink-0">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon className="w-5 h-5 text-primary" />
                      <h2 className="text-xl font-semibold">{step.title}</h2>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                    {step.details && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-md">
                        <p className="text-sm text-muted-foreground italic">{step.details}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              Using the Extension
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Capture & Analyze</p>
                <p className="text-sm text-muted-foreground">
                  Press <kbd className="px-2 py-1 bg-background rounded text-xs font-mono border mx-1">Ctrl</kbd> + 
                  <kbd className="px-2 py-1 bg-background rounded text-xs font-mono border mx-1">Shift</kbd> + 
                  <kbd className="px-2 py-1 bg-background rounded text-xs font-mono border mx-1">P</kbd> to capture your screen and analyze the current hand.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">View Results</p>
                <p className="text-sm text-muted-foreground">
                  The AI recommendation will appear as an overlay on your screen. Click anywhere outside to dismiss it.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Adjust Settings</p>
                <p className="text-sm text-muted-foreground">
                  Click the extension icon to access settings and update the API URL if needed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-600 dark:text-yellow-400">Important Note</p>
                <p className="text-sm text-muted-foreground">
                  This extension is designed as a training and review tool. Please check your poker platform's terms of service 
                  regarding the use of third-party assistance during live play.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <Link href="/app">
            <Button size="lg" data-testid="button-launch-app">
              <Spade className="w-5 h-5 mr-2" />
              Try Web App Instead
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
