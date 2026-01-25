import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { 
  Spade, 
  ArrowLeft, 
  TrendingDown, 
  Hand, 
  Target, 
  TrendingUp, 
  Flame,
  Trophy,
  Zap,
  RotateCcw,
  ChevronRight,
  Brain,
  MapPin,
  Coins
} from "lucide-react";
import { quizScenarios, type QuizScenario } from "@/data/quiz-scenarios";
import { RangeMatrix } from "@/components/RangeMatrix";
import { rangePresets } from "@/data/range-presets";

type Answer = "FOLD" | "CHECK" | "CALL" | "RAISE" | "ALL-IN";

interface QuizStats {
  streak: number;
  bestStreak: number;
  totalCorrect: number;
  totalAnswered: number;
}

const STORAGE_KEY = "poker-quiz-stats";

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-500/10 text-green-600 border-green-500/30",
  intermediate: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  advanced: "bg-red-500/10 text-red-600 border-red-500/30"
};

const answerButtons: { value: Answer; icon: typeof Target; label: string }[] = [
  { value: "FOLD", icon: TrendingDown, label: "Fold" },
  { value: "CHECK", icon: Hand, label: "Check" },
  { value: "CALL", icon: Target, label: "Call" },
  { value: "RAISE", icon: TrendingUp, label: "Raise" },
  { value: "ALL-IN", icon: Flame, label: "All-In" }
];

function getRandomScenario(exclude?: string): QuizScenario {
  const available = exclude 
    ? quizScenarios.filter(s => s.id !== exclude) 
    : quizScenarios;
  return available[Math.floor(Math.random() * available.length)];
}

function loadStats(): QuizStats {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}
  return { streak: 0, bestStreak: 0, totalCorrect: 0, totalAnswered: 0 };
}

function saveStats(stats: QuizStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {}
}

export default function Quiz() {
  const [scenario, setScenario] = useState<QuizScenario>(() => getRandomScenario());
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [stats, setStats] = useState<QuizStats>(loadStats);

  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  const handleAnswer = (answer: Answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === scenario.correctAnswer;
    
    setStats(prev => {
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      return {
        streak: newStreak,
        bestStreak: Math.max(newStreak, prev.bestStreak),
        totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
        totalAnswered: prev.totalAnswered + 1
      };
    });
  };

  const handleNext = () => {
    setScenario(getRandomScenario(scenario.id));
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleReset = () => {
    setStats({ streak: 0, bestStreak: 0, totalCorrect: 0, totalAnswered: 0 });
  };

  const isCorrect = selectedAnswer === scenario.correctAnswer;
  const accuracy = stats.totalAnswered > 0 
    ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-2xl mx-auto flex h-14 items-center justify-between gap-4 px-4">
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
                  <span className="text-lg font-semibold leading-none" data-testid="text-brand">Poker Quiz</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1" data-testid="badge-streak">
              <Zap className="w-3 h-3" />
              {stats.streak} streak
            </Badge>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center">
              <div className="text-2xl font-bold text-primary" data-testid="stat-streak">{stats.streak}</div>
              <div className="text-xs text-muted-foreground">Current Streak</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-2xl font-bold text-yellow-500" data-testid="stat-best">{stats.bestStreak}</div>
              <div className="text-xs text-muted-foreground">Best Streak</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-2xl font-bold" data-testid="stat-accuracy">{accuracy}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </Card>
          </div>

          <Card data-testid="card-scenario">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-lg">{scenario.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className={difficultyColors[scenario.difficulty]}>
                    {scenario.difficulty}
                  </Badge>
                  <Badge variant="outline">{scenario.category}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground" data-testid="text-description">{scenario.description}</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                  <Hand className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">Your Hand</div>
                    <div className="font-semibold" data-testid="text-hero-cards">{scenario.heroCards}</div>
                  </div>
                </div>
                {scenario.communityCards && (
                  <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                    <Target className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">Board</div>
                      <div className="font-semibold" data-testid="text-board">{scenario.communityCards}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                  <MapPin className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">Position</div>
                    <div className="font-semibold" data-testid="text-position">{scenario.position}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                  <Coins className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">Stack</div>
                    <div className="font-semibold" data-testid="text-stack">{scenario.stackSize}</div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-md bg-secondary/50 text-center">
                <div className="text-sm text-muted-foreground mb-1">Villain Action</div>
                <div className="font-medium" data-testid="text-villain-action">{scenario.villainAction}</div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h3 className="font-semibold text-center">What's your move?</h3>
            <div className="grid grid-cols-5 gap-2">
              {answerButtons.map(({ value, icon: Icon, label }) => {
                let variant: "default" | "outline" | "destructive" | "secondary" = "outline";
                let extraClass = "";
                
                if (showResult) {
                  if (value === scenario.correctAnswer) {
                    variant = "default";
                    extraClass = "bg-green-600 hover:bg-green-600 border-green-600";
                  } else if (value === selectedAnswer && !isCorrect) {
                    variant = "destructive";
                  }
                } else if (value === selectedAnswer) {
                  variant = "default";
                }

                return (
                  <Button
                    key={value}
                    variant={variant}
                    className={`flex-col h-auto py-3 ${extraClass}`}
                    onClick={() => handleAnswer(value)}
                    disabled={showResult}
                    data-testid={`button-answer-${value.toLowerCase()}`}
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    <span className="text-xs">{label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {showResult && (
            <Card className={isCorrect ? "border-green-500/50 bg-green-500/5" : "border-red-500/50 bg-red-500/5"} data-testid="card-result">
              <CardContent className="py-4">
                <div className="flex items-center gap-3 mb-3">
                  {isCorrect ? (
                    <>
                      <Trophy className="w-6 h-6 text-green-500" />
                      <span className="font-bold text-green-600">Correct!</span>
                    </>
                  ) : (
                    <>
                      <Brain className="w-6 h-6 text-red-500" />
                      <span className="font-bold text-red-600">
                        Not quite - the answer is {scenario.correctAnswer}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-muted-foreground text-sm" data-testid="text-explanation">
                  {scenario.explanation}
                </p>
              </CardContent>
            </Card>
          )}

          {showResult && !scenario.communityCards && (() => {
            const positionMap: Record<string, string> = {
              "UTG": "utg-open",
              "MP": "mp-open", 
              "CO": "co-open",
              "BTN": "btn-open",
              "SB": "sb-open",
              "BB": "bb-defend"
            };
            const presetId = positionMap[scenario.position];
            const preset = rangePresets.find(p => p.id === presetId);
            if (!preset) return null;
            return (
              <Card data-testid="card-range-reference">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {scenario.position} Opening Range Reference
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This is a typical {scenario.position} opening range. Your hand {scenario.heroCards} falls within the recommended play.
                  </p>
                  <div className="flex justify-center">
                    <RangeMatrix ranges={preset.ranges} showLegend={true} />
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {showResult && (
            <div className="flex justify-center gap-3">
              <Button onClick={handleNext} size="lg" data-testid="button-next">
                Next Question
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          <div className="text-center">
            <Button variant="ghost" size="sm" onClick={handleReset} data-testid="button-reset-stats">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Stats
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
