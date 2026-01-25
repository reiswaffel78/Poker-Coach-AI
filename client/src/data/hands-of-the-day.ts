import type { HandOfTheDay } from "@shared/content-types";

export const handsOfTheDay: HandOfTheDay[] = [
  {
    slug: "button-3bet-pot-vs-utg-raise",
    title: "Button 3-Bet Pot vs UTG Raise",
    spot: "3-Bet Pot on Flop",
    summary: "Hero holds AKo on the Button facing a UTG open. After 3-betting and getting called, we face a decision on a dry Ace-high flop.",
    stakes: "NL100 (100bb effective)",
    heroPosition: "Button (BTN)",
    villainPosition: "Under the Gun (UTG)",
    heroStack: "100 BB",
    villainStack: "100 BB",
    heroCards: "A♠ K♦",
    communityCards: "A♣ 7♥ 2♠",
    actions: [
      { street: "Preflop", action: "UTG raises 3BB, Hero 3-bets to 10BB, UTG calls", potAfter: "21BB" },
      { street: "Flop", action: "UTG checks, Hero bets 7BB, UTG calls", potAfter: "35BB" },
      { street: "Turn", action: "7♦ - UTG checks, Hero?" }
    ],
    aiRecommendation: "RAISE",
    aiReasoning: "With top pair top kicker on a dry board, we have a strong value hand. Villain's UTG range that calls a 3-bet contains many Ax hands (AQ, AJ, AT) and pocket pairs. Betting 60-70% pot for value is optimal. We extract value from worse Ax hands while maintaining our betting range balance.",
    alternatives: [
      { action: "CHECK", reasoning: "Pot control if villain shows extreme strength later, but misses value from worse hands." },
      { action: "ALL-IN", reasoning: "Overbet is too aggressive here - we want calls from second-best hands, not folds." }
    ],
    commonMistakes: [
      "Checking back for pot control when you have a clear value hand",
      "Betting too small and not extracting maximum value",
      "Overvaluing top pair against UTG's tight 3-bet calling range",
      "Not considering villain's potential sets (77, 22) in their range"
    ],
    publishedAt: "2024-01-25"
  },
  {
    slug: "defending-big-blind-vs-steal",
    title: "Defending Big Blind vs Button Steal",
    spot: "BB Defense Preflop",
    summary: "Hero is in the Big Blind with a marginal hand facing a button steal attempt. How wide should we defend?",
    stakes: "NL50 (100bb effective)",
    heroPosition: "Big Blind (BB)",
    villainPosition: "Button (BTN)",
    heroStack: "100 BB",
    villainStack: "100 BB",
    heroCards: "J♥ 8♥",
    communityCards: undefined,
    actions: [
      { street: "Preflop", action: "Folds to BTN, BTN raises 2.5BB, SB folds, Hero?" }
    ],
    aiRecommendation: "CALL",
    aiReasoning: "J8s is a profitable defend from the BB facing a 2.5x button open. We're getting 3.5:1 on a call, and suited connectors play well postflop with good playability. Our equity is approximately 40% against a wide button stealing range. The discount from the blind makes this a clear call.",
    alternatives: [
      { action: "RAISE", reasoning: "3-betting as a bluff can work but J8s plays better as a call with its playability." },
      { action: "FOLD", reasoning: "Only correct vs very tight button ranges or high rake environments." }
    ],
    commonMistakes: [
      "Folding too many playable hands from the BB",
      "3-betting marginal hands instead of flatting with position disadvantage",
      "Not adjusting defense range based on opener's position",
      "Ignoring pot odds when deciding to defend"
    ],
    publishedAt: "2024-01-24"
  },
  {
    slug: "river-bluff-catch-vs-aggressor",
    title: "River Bluff Catch Decision",
    spot: "River Call vs Triple Barrel",
    summary: "Hero called down with second pair on a dynamic board. Villain fires third barrel on the river - hero or fold?",
    stakes: "NL200 (150bb effective)",
    heroPosition: "Cutoff (CO)",
    villainPosition: "Hijack (HJ)",
    heroStack: "150 BB",
    villainStack: "150 BB",
    heroCards: "K♠ Q♠",
    communityCards: "Q♦ 9♣ 4♥ 7♠ 2♣",
    actions: [
      { street: "Preflop", action: "HJ raises 3BB, Hero calls, others fold", potAfter: "7.5BB" },
      { street: "Flop", action: "HJ bets 5BB, Hero calls", potAfter: "17.5BB" },
      { street: "Turn", action: "HJ bets 12BB, Hero calls", potAfter: "41.5BB" },
      { street: "River", action: "HJ bets 35BB, Hero?" }
    ],
    aiRecommendation: "CALL",
    aiReasoning: "KQ with second pair is at the top of our calling range on this runout. The board is relatively dry with no completed draws. Villain's triple barrel range should include bluffs with missed draws (JT, T8, flush draws on flop). We're getting 2.2:1 and need ~31% equity to call. Against a balanced range, this is a mandatory call.",
    alternatives: [
      { action: "FOLD", reasoning: "Only correct if villain never bluffs or is extremely value-heavy in this spot." },
      { action: "RAISE", reasoning: "Raising would turn our hand into a bluff and is unnecessary with showdown value." }
    ],
    commonMistakes: [
      "Folding too often to river aggression with bluff catchers",
      "Not considering what hands you beat that villain could have",
      "Ignoring the pot odds when facing river bets",
      "Hero folding without reads just because 'they might have it'"
    ],
    publishedAt: "2024-01-23"
  }
];
