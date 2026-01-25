import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { RangeMatrix } from "@/components/RangeMatrix";
import { rangePresets } from "@/data/range-presets";
import { Spade, ArrowLeft, MapPin, Info } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Ranges() {
  const [selectedPreset, setSelectedPreset] = useState(rangePresets[0]);

  return (
    <>
      <Helmet>
        <title>Poker Hand Ranges | Opening Ranges by Position | Poker Coach AI</title>
        <meta name="description" content="Visualize poker hand ranges for every position. See which hands to raise, call, or fold from UTG, MP, CO, BTN, SB, and BB with our interactive range matrix." />
        <link rel="canonical" href="https://poker-coach-ai.replit.app/ranges" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container max-w-4xl mx-auto flex h-14 items-center justify-between gap-4 px-4">
            <div className="flex items-center gap-3">
              <Link href="/">
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
                    <span className="text-lg font-semibold leading-none" data-testid="text-brand">Hand Ranges</span>
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
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Poker Hand Ranges</h1>
              <p className="text-muted-foreground">
                Visualize opening and defending ranges by position
              </p>
            </div>

            <Card className="mb-6" data-testid="card-position-selector">
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-medium">Select Position</span>
                  </div>
                  <Select 
                    value={selectedPreset.id} 
                    onValueChange={(id) => setSelectedPreset(rangePresets.find(p => p.id === id) || rangePresets[0])}
                  >
                    <SelectTrigger className="w-[220px]" data-testid="select-position">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {rangePresets.map((preset) => (
                        <SelectItem key={preset.id} value={preset.id} data-testid={`option-${preset.id}`}>
                          <span className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">{preset.position}</Badge>
                            {preset.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card data-testid="card-preset-info">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge variant="default">{selectedPreset.position}</Badge>
                    {selectedPreset.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{selectedPreset.description}</p>
                  <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                    <Info className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground">{selectedPreset.scenario}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center items-center">
                <RangeMatrix 
                  ranges={selectedPreset.ranges} 
                  showLegend={true}
                />
              </div>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  How to Read the Range Matrix
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>The matrix shows all 169 unique starting hand combinations in Texas Hold'em:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Diagonal:</strong> Pocket pairs (AA, KK, etc.)</li>
                  <li><strong>Above diagonal (s):</strong> Suited hands (same suit)</li>
                  <li><strong>Below diagonal (o):</strong> Offsuit hands (different suits)</li>
                </ul>
                <p>Green cells are hands to raise/open, yellow are calling hands, and gray cells should be folded.</p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="py-6 text-center">
                <h2 className="text-lg font-semibold mb-2">Practice Your Ranges</h2>
                <p className="text-muted-foreground mb-4">
                  Test your knowledge with our poker quiz
                </p>
                <Link href="/quiz">
                  <Button data-testid="button-try-quiz">Try the Poker Quiz</Button>
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
