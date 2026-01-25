import type { WikiTerm } from "@shared/content-types";

export const wikiTerms: WikiTerm[] = [
  {
    slug: "pot-odds",
    term: "Pot Odds",
    definition: "The ratio between the current pot size and the cost of a contemplated call, used to determine if a call is mathematically profitable.",
    formula: "Pot Odds = Pot Size / Call Amount (e.g., 100/20 = 5:1 or 20%)",
    example: "The pot is $100 and villain bets $50. You need to call $50 to win $150, giving you 3:1 pot odds (25%). If your hand wins more than 25% of the time, calling is profitable.",
    relatedTerms: ["implied-odds", "equity", "expected-value"],
    category: "math"
  },
  {
    slug: "equity",
    term: "Equity",
    definition: "Your percentage chance of winning the pot at showdown based on your current hand against your opponent's range.",
    formula: "Equity = (Winning Combinations / Total Combinations) × 100%",
    example: "Holding A♠K♠ vs Q♠Q♦ preflop, you have approximately 43% equity. This means you'll win about 43 out of 100 all-in situations.",
    relatedTerms: ["pot-odds", "fold-equity", "expected-value"],
    category: "math"
  },
  {
    slug: "position",
    term: "Position",
    definition: "Your seating location relative to the dealer button, determining when you act in each betting round.",
    example: "The Button acts last postflop, giving maximum information advantage. Early positions (UTG) act first with the least information.",
    relatedTerms: ["button", "blinds", "cutoff"],
    category: "positions"
  },
  {
    slug: "three-bet",
    term: "3-Bet",
    definition: "The third bet in a sequence - typically a re-raise over an initial open raise.",
    example: "UTG opens to 3BB, you raise to 9BB from the Button. Your raise is called a 3-bet. The blinds posting was bet 1, the open was bet 2, your re-raise is bet 3.",
    relatedTerms: ["four-bet", "cold-call", "squeeze"],
    category: "actions"
  },
  {
    slug: "continuation-bet",
    term: "Continuation Bet (C-Bet)",
    definition: "A bet made by the preflop aggressor on the flop, continuing the story of having a strong hand.",
    example: "You raise preflop with A♠K♦ and get one caller. The flop comes 7♥4♠2♣ missing your hand. Betting here is a c-bet, leveraging your perceived range advantage.",
    relatedTerms: ["bluff", "value-bet", "aggressor"],
    category: "strategy"
  },
  {
    slug: "implied-odds",
    term: "Implied Odds",
    definition: "The expected future winnings you can add to the pot odds when calling, based on potential bets you'll win if you hit your hand.",
    formula: "Implied Odds = (Pot + Expected Future Bets) / Call Amount",
    example: "Calling a bet with a flush draw might seem unprofitable with pot odds alone, but if you expect villain to pay off big when you hit, implied odds make the call profitable.",
    relatedTerms: ["pot-odds", "set-mining", "drawing-hands"],
    category: "math"
  },
  {
    slug: "expected-value",
    term: "Expected Value (EV)",
    definition: "The average amount you expect to win or lose per decision over many iterations, measuring long-term profitability.",
    formula: "EV = (Win% × Win Amount) - (Lose% × Lose Amount)",
    example: "Calling a $100 all-in where you have 60% equity: EV = (0.6 × $100) - (0.4 × $100) = $60 - $40 = +$20 EV per call.",
    relatedTerms: ["equity", "variance", "pot-odds"],
    category: "math"
  },
  {
    slug: "button",
    term: "Button (BTN)",
    definition: "The most advantageous position at the table, acting last in all postflop betting rounds.",
    example: "On the Button, you can play wider ranges (more hands) because you have position on all opponents postflop, giving you information and control advantages.",
    relatedTerms: ["position", "cutoff", "blinds"],
    category: "positions"
  },
  {
    slug: "blinds",
    term: "Blinds",
    definition: "Forced bets posted by the two players left of the dealer button before cards are dealt.",
    example: "In a $1/$2 game, the Small Blind posts $1 and the Big Blind posts $2. These create initial action and define the minimum bet size.",
    relatedTerms: ["button", "ante", "position"],
    category: "basics"
  },
  {
    slug: "fold-equity",
    term: "Fold Equity",
    definition: "The value gained from the possibility of your opponent folding to your bet or raise.",
    formula: "Fold Equity = Opponent's Fold% × Pot Size",
    example: "Betting $50 into a $100 pot where opponent folds 40% of the time gives you $40 fold equity (0.4 × $100), plus your equity when called.",
    relatedTerms: ["bluff", "semi-bluff", "equity"],
    category: "strategy"
  }
];
