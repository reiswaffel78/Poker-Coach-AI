export interface QuizScenario {
  id: string;
  title: string;
  description: string;
  heroCards: string;
  communityCards: string | null;
  position: string;
  potSize: string;
  stackSize: string;
  villainAction: string;
  correctAnswer: "FOLD" | "CHECK" | "CALL" | "RAISE" | "ALL-IN";
  explanation: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
}

export const quizScenarios: QuizScenario[] = [
  {
    id: "preflop-aces-utg",
    title: "Premium Hand UTG",
    description: "You're dealt pocket aces under the gun at a 6-max cash game. Action is on you.",
    heroCards: "As Ah",
    communityCards: null,
    position: "UTG",
    potSize: "1.5BB",
    stackSize: "100BB",
    villainAction: "Waiting for your action",
    correctAnswer: "RAISE",
    explanation: "Pocket aces are the strongest starting hand. From UTG, you should raise to build the pot and narrow the field. A standard open is 2.5-3BB. Limping would be a mistake as it allows multiple players to see a cheap flop, reducing your edge.",
    difficulty: "beginner",
    category: "Preflop"
  },
  {
    id: "flop-tptk-facing-raise",
    title: "Top Pair Top Kicker Facing Raise",
    description: "You opened AKo from CO, BTN called. Flop comes A-7-2 rainbow. You c-bet, villain raises.",
    heroCards: "Ac Kh",
    communityCards: "As 7d 2c",
    position: "CO",
    potSize: "15BB",
    stackSize: "95BB",
    villainAction: "Raises to 3x your c-bet",
    correctAnswer: "CALL",
    explanation: "You have top pair top kicker on a dry board. Villain's raise is concerning but folding TPTK here is too tight. Call to see the turn and reassess. 3-betting here would commit you unnecessarily against sets and two pairs that villain might have.",
    difficulty: "intermediate",
    category: "Postflop"
  },
  {
    id: "river-missed-draw",
    title: "Missed Draw on the River",
    description: "You called a raise with suited connectors, drew to a flush and straight. River bricks.",
    heroCards: "8h 7h",
    communityCards: "Kh 5h 2s 9c Jd",
    position: "BTN",
    potSize: "25BB",
    stackSize: "75BB",
    villainAction: "Bets 60% pot",
    correctAnswer: "FOLD",
    explanation: "Your hand has no showdown value - just 8 high. You missed both your flush and straight draws. While bluff-raising is possible in some spots, calling here is burning money. Fold and wait for a better spot.",
    difficulty: "beginner",
    category: "River Play"
  },
  {
    id: "squeeze-opportunity",
    title: "The Squeeze Play",
    description: "UTG opens, two players cold call. You're in the BB with a suited ace.",
    heroCards: "As 5s",
    communityCards: null,
    position: "BB",
    potSize: "10.5BB",
    stackSize: "85BB",
    villainAction: "UTG opened, MP and CO called",
    correctAnswer: "RAISE",
    explanation: "This is a textbook squeeze spot. The cold callers have capped ranges (they would have 3-bet with premiums). A5s plays well as a squeeze with fold equity plus backup equity when called. Raise to about 12-15BB to put maximum pressure on the cold callers.",
    difficulty: "advanced",
    category: "3-Bet Pots"
  },
  {
    id: "set-on-wet-board",
    title: "Set on a Wet Board",
    description: "You flopped a set of 7s but the board is very draw-heavy.",
    heroCards: "7c 7d",
    communityCards: "Ts 7s 8d",
    position: "BTN",
    potSize: "12BB",
    stackSize: "100BB",
    villainAction: "Villain checks to you",
    correctAnswer: "RAISE",
    explanation: "You have a monster (set of 7s) but the board is extremely wet with flush and straight draws possible. You MUST bet for value and protection. Size up to around 75-100% pot to deny equity to draws. Checking here is a major mistake.",
    difficulty: "intermediate",
    category: "Postflop"
  },
  {
    id: "overbet-bluff-spot",
    title: "Facing the Overbet",
    description: "Villain has been passive all hand, then overbets 150% pot on a blank river.",
    heroCards: "Qd Jd",
    communityCards: "Kh 9s 4c 2h 6d",
    position: "CO",
    potSize: "20BB",
    stackSize: "50BB",
    villainAction: "Overbets 30BB (150% pot)",
    correctAnswer: "FOLD",
    explanation: "You have just Queen-high. While overbets can be bluffs, calling here with no pair is lighting money on fire. Your hand has zero showdown value and villain's sizing polarized them to very strong hands or bluffs. Without a read, default to folding your air.",
    difficulty: "beginner",
    category: "River Play"
  },
  {
    id: "multiway-pot-marginal",
    title: "Multiway with Marginal Hand",
    description: "You have middle pair in a 4-way pot. First to act on the flop.",
    heroCards: "9h 8h",
    communityCards: "Kc 9d 4s",
    position: "UTG",
    potSize: "8BB",
    stackSize: "95BB",
    villainAction: "3 players waiting behind you",
    correctAnswer: "CHECK",
    explanation: "In multiway pots, you need a stronger hand to bet for value. Middle pair with a decent kicker is a clear check here - if you bet and get called or raised, you're in a tough spot. Let others define their hands first.",
    difficulty: "intermediate",
    category: "Multiway"
  },
  {
    id: "short-stack-shove",
    title: "Short Stack Decision",
    description: "Tournament play, you're short stacked with 12BB. Folded to you on the button.",
    heroCards: "Kd Ts",
    communityCards: null,
    position: "BTN",
    potSize: "1.5BB",
    stackSize: "12BB",
    villainAction: "Folded to you, blinds waiting",
    correctAnswer: "ALL-IN",
    explanation: "With 12BB on the button, KTo is a clear shove according to push/fold charts. You have good fold equity against the blinds, and when called you'll often have two live cards. Raising small and folding to a 3-bet would waste chips.",
    difficulty: "intermediate",
    category: "Tournament"
  }
];
