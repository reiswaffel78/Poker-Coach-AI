export type SpotCategory = "preflop" | "flop" | "turn" | "river";
export type ActionType = "fold" | "check" | "call" | "raise" | "bet" | "all-in";

export interface StreetAction {
  street: "preflop" | "flop" | "turn" | "river";
  heroPosition: string;
  villainPosition: string;
  heroAction: string;
  villainAction: string;
  potAfter?: string;
}

export interface PokerSpot {
  slug: string;
  title: string;
  category: SpotCategory;
  heroHand?: string;
  villainRange?: string;
  board?: string;
  description: string;
  whenItHappens: string;
  actions: StreetAction[];
  aiSolution: {
    recommendation: ActionType;
    frequency?: string;
    reasoning: string;
  };
  exploitAdjustment?: {
    vsPassive?: string;
    vsAggressive?: string;
    vsTight?: string;
    vsLoose?: string;
  };
  relatedWikiTerms: string[];
  relatedQuizIds?: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
}

export const pokerSpots: PokerSpot[] = [
  {
    slug: "ak-vs-qq-preflop-3bet-pot",
    title: "AK vs QQ in 3-Bet Pot",
    category: "preflop",
    heroHand: "AKs",
    villainRange: "QQ+, AK",
    description: "Classic preflop confrontation where AK faces a premium pair. Understanding 4-bet/call frequencies is crucial.",
    whenItHappens: "You open from MP/CO with AKs and face a 3-bet from the button or blinds. This is one of the most common high-stakes preflop decisions.",
    actions: [
      { street: "preflop", heroPosition: "CO", villainPosition: "BTN", heroAction: "Open 2.5bb", villainAction: "3-bet 8bb", potAfter: "11.5bb" }
    ],
    aiSolution: {
      recommendation: "call",
      frequency: "60% call, 40% 4-bet",
      reasoning: "Against a standard 3-bet range, AKs has good equity but isn't strong enough to always 4-bet for value. Mixing between calling and 4-betting balances your range and avoids becoming predictable."
    },
    exploitAdjustment: {
      vsTight: "Lean towards calling. Tight players 3-bet premium hands, and 4-betting gets you in tough spots vs AA/KK.",
      vsLoose: "Increase 4-bet frequency to 60-70%. Loose 3-bettors fold too much to 4-bets.",
      vsAggressive: "Consider 4-bet/fold more often against hyper-aggressive opponents."
    },
    relatedWikiTerms: ["3-bet", "4-bet", "premium-hands", "position"],
    difficulty: "intermediate",
    tags: ["preflop", "3-bet", "AK", "premium"]
  },
  {
    slug: "btn-vs-bb-cbet-dry-flop",
    title: "Button C-Bet vs BB on Dry Flop",
    category: "flop",
    heroHand: "Range",
    board: "K72r",
    description: "Standard continuation bet spot on a dry, disconnected flop where the preflop raiser has range advantage.",
    whenItHappens: "You opened from the button, BB called. Flop comes dry and high (K72 rainbow). This is a textbook c-bet situation.",
    actions: [
      { street: "preflop", heroPosition: "BTN", villainPosition: "BB", heroAction: "Open 2.5bb", villainAction: "Call", potAfter: "5.5bb" },
      { street: "flop", heroPosition: "BTN", villainPosition: "BB", heroAction: "C-bet 33%", villainAction: "?", potAfter: "7.3bb" }
    ],
    aiSolution: {
      recommendation: "bet",
      frequency: "75-85% range c-bet",
      reasoning: "On K72r, the button has significant range and nut advantage. A small c-bet (25-33% pot) is highly profitable with nearly your entire range because BB will fold many weak hands that have no equity."
    },
    exploitAdjustment: {
      vsPassive: "C-bet 100% of range. Passive players overfold to any aggression.",
      vsAggressive: "Reduce c-bet frequency to 60% with stronger hands. Check back weak holdings.",
      vsTight: "C-bet more bluffs, as tight players fold medium-strength hands."
    },
    relatedWikiTerms: ["c-bet", "range-advantage", "dry-board", "position"],
    difficulty: "beginner",
    tags: ["flop", "c-bet", "dry-board", "position"]
  },
  {
    slug: "river-bluff-check-raise",
    title: "River Bluff Check-Raise",
    category: "river",
    heroHand: "Missed Draw",
    board: "Ts7s4h2dKc",
    description: "Converting a missed draw into a bluff by check-raising the river when your range can credibly represent strong hands.",
    whenItHappens: "You called flop and turn with a flush draw from the BB. River bricks and villain bets. You can represent the King or a slow-played set.",
    actions: [
      { street: "flop", heroPosition: "BB", villainPosition: "BTN", heroAction: "Check-call", villainAction: "Bet 50%", potAfter: "8bb" },
      { street: "turn", heroPosition: "BB", villainPosition: "BTN", heroAction: "Check-call", villainAction: "Bet 66%", potAfter: "21bb" },
      { street: "river", heroPosition: "BB", villainPosition: "BTN", heroAction: "Check-raise 2.5x", villainAction: "Bet 75%", potAfter: "~90bb" }
    ],
    aiSolution: {
      recommendation: "raise",
      frequency: "10-15% of missed draws",
      reasoning: "With the King hitting the river, your check-raising range can credibly include Kx hands and slow-played sets. Villain must fold one-pair hands and even some two-pair to a polarized check-raise."
    },
    exploitAdjustment: {
      vsPassive: "Avoid bluffing. Passive players call too much on rivers.",
      vsAggressive: "Bluff more often. Aggressive players bet thin and fold to raises.",
      vsTight: "Prime bluff target. Tight players only continue with the nuts."
    },
    relatedWikiTerms: ["check-raise", "bluff", "polarized-range", "river-play"],
    difficulty: "advanced",
    tags: ["river", "bluff", "check-raise", "missed-draw"]
  },
  {
    slug: "squeeze-play-multiway",
    title: "Squeeze Play in Multiway Pot",
    category: "preflop",
    heroHand: "A5s, KQo+",
    description: "Applying pressure with a large 3-bet when facing an open and one or more callers.",
    whenItHappens: "MP opens, CO calls, you're in the blinds with a hand too strong to fold but not premium. The squeeze puts maximum pressure on both opponents.",
    actions: [
      { street: "preflop", heroPosition: "BB", villainPosition: "MP+CO", heroAction: "Squeeze 4x open", villainAction: "Open + Call", potAfter: "~15bb" }
    ],
    aiSolution: {
      recommendation: "raise",
      frequency: "With A2s-A5s, KQo, suited broadways",
      reasoning: "The cold caller has a capped range (would 3-bet with premiums). The opener must now worry about both the caller behind and your strong 3-bet. Both often fold, giving you immediate profit."
    },
    exploitAdjustment: {
      vsTight: "Squeeze wider. Tight players fold to aggression even with decent hands.",
      vsLoose: "Tighten squeeze range. Loose players call 3-bets too often.",
      vsAggressive: "Be prepared for 4-bets. Only squeeze with hands you can continue with."
    },
    relatedWikiTerms: ["squeeze", "3-bet", "dead-money", "fold-equity"],
    difficulty: "intermediate",
    tags: ["preflop", "squeeze", "multiway", "aggression"]
  },
  {
    slug: "oop-donk-bet-wet-flop",
    title: "Donk Bet Out of Position on Wet Flop",
    category: "flop",
    heroHand: "Middle Pair + Draw",
    board: "8s7s4c",
    description: "Leading into the preflop raiser on a coordinated board where your range connects well.",
    whenItHappens: "You defended BB vs BTN open. Flop is wet and connected, hitting your defending range hard. A donk bet can be more profitable than check-calling.",
    actions: [
      { street: "preflop", heroPosition: "BB", villainPosition: "BTN", heroAction: "Call", villainAction: "Open 2.5bb", potAfter: "5bb" },
      { street: "flop", heroPosition: "BB", villainPosition: "BTN", heroAction: "Donk 33%", villainAction: "?", potAfter: "6.6bb" }
    ],
    aiSolution: {
      recommendation: "bet",
      frequency: "25-30% of range as donk bet",
      reasoning: "On 874ss, the BB's range actually has more equity than BTN. Leading with draws, pairs, and combo draws builds the pot and denies free cards. It also prevents BTN from realizing free equity with overcards."
    },
    exploitAdjustment: {
      vsPassive: "Donk more for value with made hands.",
      vsAggressive: "Donk with draws to induce raises, then call or 3-bet.",
      vsTight: "Donk more bluffs; tight players fold to unexpected aggression."
    },
    relatedWikiTerms: ["donk-bet", "wet-board", "equity-denial", "out-of-position"],
    difficulty: "advanced",
    tags: ["flop", "donk-bet", "wet-board", "oop"]
  },
  {
    slug: "turn-barrel-scary-card",
    title: "Turn Barrel When Scary Card Hits",
    category: "turn",
    heroHand: "Overcards (AQ)",
    board: "J84hKh",
    description: "Continuing aggression when the turn card favors your perceived range more than villain's calling range.",
    whenItHappens: "You c-bet flop with AQ (overcards + backdoor draws), villain called. Turn brings a King, a great barrel card that you can represent.",
    actions: [
      { street: "flop", heroPosition: "CO", villainPosition: "BB", heroAction: "C-bet 50%", villainAction: "Call", potAfter: "8bb" },
      { street: "turn", heroPosition: "CO", villainPosition: "BB", heroAction: "Barrel 66%", villainAction: "?", potAfter: "21bb" }
    ],
    aiSolution: {
      recommendation: "bet",
      frequency: "70-80% with overcards on K turn",
      reasoning: "The King is a great barrel card. Your range contains more Kx hands than BB's flop calling range. Villain must fold Jx, 8x, and draws facing continued aggression on a card that hits your range."
    },
    exploitAdjustment: {
      vsPassive: "Barrel less for thin value; passive players don't fold made hands.",
      vsAggressive: "Barrel more. Aggressive callers may check-raise bluff, allowing you to fold equity.",
      vsTight: "Prime barrel spot. Tight players only continue with two-pair+."
    },
    relatedWikiTerms: ["barrel", "turn-play", "scare-card", "range-advantage"],
    difficulty: "intermediate",
    tags: ["turn", "barrel", "bluff", "overcards"]
  },
  {
    slug: "set-over-set-cooldown",
    title: "Set Over Set - Cooler Management",
    category: "flop",
    heroHand: "77",
    board: "K74r",
    description: "Navigating the rare but devastating set-over-set scenario. Focus on maximizing value while accepting coolers happen.",
    whenItHappens: "You hit a set on a dry flop but face unexpected aggression. Understanding when you're coolered vs. when to stack off is crucial.",
    actions: [
      { street: "flop", heroPosition: "MP", villainPosition: "BB", heroAction: "C-bet 33%", villainAction: "Check-raise 3x", potAfter: "~12bb" },
      { street: "flop", heroPosition: "MP", villainPosition: "BB", heroAction: "Re-raise 2.5x", villainAction: "?", potAfter: "~35bb" }
    ],
    aiSolution: {
      recommendation: "raise",
      frequency: "100% 3-bet with middle/bottom set",
      reasoning: "You have a monster. Re-raise for value and get stacks in. Set-over-set is rare (~1%). Don't slow play bottom set on a board where draws exist. Villain's check-raise range includes top pair, overpairs, and draws."
    },
    exploitAdjustment: {
      vsTight: "Tight check-raise = danger. Consider flatting to induce further bluffs on later streets.",
      vsLoose: "Get it in immediately. Loose players stack off with overpairs and draws."
    },
    relatedWikiTerms: ["set", "cooler", "check-raise", "value-bet"],
    difficulty: "intermediate",
    tags: ["flop", "set", "cooler", "value"]
  },
  {
    slug: "blind-vs-blind-war",
    title: "SB vs BB Battle",
    category: "preflop",
    heroHand: "Wide Range",
    description: "Heads-up battle between the blinds with unique dynamics and wider ranges than any other position.",
    whenItHappens: "Everyone folds to SB. The blind-vs-blind dynamic requires different sizing, frequencies, and post-flop adjustments.",
    actions: [
      { street: "preflop", heroPosition: "SB", villainPosition: "BB", heroAction: "Open 2-2.5bb", villainAction: "?", potAfter: "4-5bb" }
    ],
    aiSolution: {
      recommendation: "raise",
      frequency: "50-70% of hands from SB",
      reasoning: "With only one opponent and dead money in the pot, you should open very wide from SB. However, you'll be OOP post-flop, so balance aggression with selectivity. Sizing can be smaller (2x-2.5x) due to the dynamic."
    },
    exploitAdjustment: {
      vsTight: "Open 70%+. Steal the blinds relentlessly.",
      vsLoose: "Tighten to 50% but value bet post-flop more.",
      vsAggressive: "Open tighter, but be prepared to call 3-bets wider."
    },
    relatedWikiTerms: ["blind-battle", "position", "stealing", "dead-money"],
    difficulty: "beginner",
    tags: ["preflop", "blinds", "stealing", "heads-up"]
  },
  {
    slug: "thin-value-bet-river",
    title: "Thin Value Bet on River",
    category: "river",
    heroHand: "Top Pair Medium Kicker",
    board: "Ks9c4h2d6s",
    description: "Extracting value with a marginal made hand when you believe villain has worse hands that will call.",
    whenItHappens: "You have Kc Tc. You bet flop and turn for value. River bricks. Do you check for showdown or bet thin for value?",
    actions: [
      { street: "river", heroPosition: "BTN", villainPosition: "BB", heroAction: "Bet 40%", villainAction: "?", potAfter: "~14bb" }
    ],
    aiSolution: {
      recommendation: "bet",
      frequency: "50-60% of thin value spots",
      reasoning: "On a blank river, villain's checking range includes many Kx hands with worse kickers, 9x, and failed draws. A 40% pot bet gets called by enough worse hands to be profitable. Checking leaves money on the table."
    },
    exploitAdjustment: {
      vsPassive: "Bet 60% pot. Passive players call with any pair.",
      vsAggressive: "Bet smaller or check. Aggressive players might bluff-raise, putting you in a tough spot.",
      vsTight: "Check for showdown. Tight players only call with better."
    },
    relatedWikiTerms: ["value-bet", "thin-value", "river-play", "bet-sizing"],
    difficulty: "advanced",
    tags: ["river", "value", "thin-value", "marginal"]
  },
  {
    slug: "triple-barrel-bluff",
    title: "Triple Barrel Bluff",
    category: "river",
    heroHand: "Missed Straight Draw",
    board: "Qc8h5d3sAc",
    description: "Committing to a bluff across all three streets when your story is credible and villain's range is weak.",
    whenItHappens: "You have 67s, opened from CO, BB called. You barreled flop and turn representing overpairs. River Ace is a great bluff card.",
    actions: [
      { street: "flop", heroPosition: "CO", villainPosition: "BB", heroAction: "C-bet 50%", villainAction: "Call", potAfter: "8bb" },
      { street: "turn", heroPosition: "CO", villainPosition: "BB", heroAction: "Barrel 66%", villainAction: "Call", potAfter: "21bb" },
      { street: "river", heroPosition: "CO", villainPosition: "BB", heroAction: "Triple barrel 75%", villainAction: "?", potAfter: "~52bb" }
    ],
    aiSolution: {
      recommendation: "bet",
      frequency: "Select best blockers only",
      reasoning: "The Ace river is excellent for bluffing - you can now represent AA, AQ, AK that would play this way. Villain's range is capped (would raise better hands earlier). A large bet forces folds from Qx, 88, 55 that made it this far."
    },
    exploitAdjustment: {
      vsPassive: "Never triple barrel bluff. Passive players call three streets.",
      vsAggressive: "Good target. Aggressive callers often have weak ranges by the river.",
      vsTight: "Excellent spot. Tight players only continue with two-pair+."
    },
    relatedWikiTerms: ["triple-barrel", "bluff", "scare-card", "blocker"],
    difficulty: "advanced",
    tags: ["river", "bluff", "triple-barrel", "advanced"]
  },
  {
    slug: "defending-vs-3bet",
    title: "Defending Against 3-Bet OOP",
    category: "preflop",
    heroHand: "Suited Connectors",
    description: "Knowing when to call 3-bets out of position with speculative hands that play well post-flop.",
    whenItHappens: "You opened from MP with 78s, BTN 3-bets. Folding is easy, but are there spots to call and play post-flop?",
    actions: [
      { street: "preflop", heroPosition: "MP", villainPosition: "BTN", heroAction: "Open 2.5bb", villainAction: "3-bet 8bb", potAfter: "11.5bb" }
    ],
    aiSolution: {
      recommendation: "call",
      frequency: "Call with best suited connectors (JTs, T9s, 98s, 87s)",
      reasoning: "Suited connectors have good implied odds when you hit. Against standard 3-bet sizing, calling 5.5bb to win 11.5bb gives decent immediate odds. Post-flop, you can flop strong draws or made hands to stack villain."
    },
    exploitAdjustment: {
      vsTight: "Fold most suited connectors. Tight 3-bet ranges crush speculative hands.",
      vsLoose: "Call wider. Loose 3-bettors have weaker ranges you can outplay post-flop.",
      vsAggressive: "Consider 4-bet bluffing instead with the most blocked combos."
    },
    relatedWikiTerms: ["3-bet-defense", "suited-connectors", "implied-odds", "position"],
    difficulty: "intermediate",
    tags: ["preflop", "3-bet", "defense", "suited-connectors"]
  },
  {
    slug: "delayed-cbet-turn",
    title: "Delayed C-Bet on Turn",
    category: "turn",
    heroHand: "Overcards + Backdoor",
    board: "9c6s2h4d",
    description: "Checking back flop with the intention to bet turn when you pick up equity or the board texture changes.",
    whenItHappens: "You have AhKh. You checked back a 962 flop. Turn 4 gives you a gutshot. Now betting makes more sense.",
    actions: [
      { street: "flop", heroPosition: "BTN", villainPosition: "BB", heroAction: "Check", villainAction: "Check", potAfter: "5bb" },
      { street: "turn", heroPosition: "BTN", villainPosition: "BB", heroAction: "Bet 66%", villainAction: "?", potAfter: "8.3bb" }
    ],
    aiSolution: {
      recommendation: "bet",
      frequency: "60-70% with overcards + any equity",
      reasoning: "The turn 4 completes a possible straight for 53 and creates a gutshot for you. More importantly, villain checked twice showing weakness. A delayed c-bet now applies pressure and can win the pot immediately."
    },
    exploitAdjustment: {
      vsPassive: "Bet more for value with any pair.",
      vsAggressive: "Bet turn as a semi-bluff to fold out hands that floated flop.",
      vsTight: "Check behind again; tight players check-call with strong hands."
    },
    relatedWikiTerms: ["delayed-cbet", "equity", "semi-bluff", "turn-play"],
    difficulty: "intermediate",
    tags: ["turn", "delayed-cbet", "bluff", "equity"]
  },
  {
    slug: "flop-check-raise-draw",
    title: "Check-Raise with Strong Draw",
    category: "flop",
    heroHand: "Flush Draw + Gutshot",
    board: "Ts7s3c",
    description: "Turning a strong draw into an aggressive check-raise to build the pot or win immediately.",
    whenItHappens: "You defend BB with 6s5s. Flop gives you flush draw + gutshot (12 outs). Villain c-bets. Check-raise to maximize equity or take it down.",
    actions: [
      { street: "flop", heroPosition: "BB", villainPosition: "CO", heroAction: "Check-raise 3x", villainAction: "C-bet 50%", potAfter: "~15bb" }
    ],
    aiSolution: {
      recommendation: "raise",
      frequency: "100% with combo draws",
      reasoning: "With 12 outs, you have 45% equity. Check-raising gets fold equity immediately and sets up huge pots when you hit. Even if called, you're not in bad shape. This is a mandatory check-raise spot."
    },
    exploitAdjustment: {
      vsPassive: "Lean toward check-calling to see free cards.",
      vsAggressive: "Check-raise and be prepared to call a 3-bet all-in.",
      vsTight: "Check-raise is excellent; tight players fold medium pairs."
    },
    relatedWikiTerms: ["check-raise", "combo-draw", "semi-bluff", "fold-equity"],
    difficulty: "intermediate",
    tags: ["flop", "check-raise", "draw", "semi-bluff"]
  },
  {
    slug: "overbet-value-river",
    title: "River Overbet for Value",
    category: "river",
    heroHand: "Nut Flush",
    board: "Kd8d4s2cTd",
    description: "Maximizing value with the nuts by using an overbet sizing that gets called by worse made hands.",
    whenItHappens: "You have AdQd. Three diamonds on the river. You've been betting for value. Time to go for maximum extraction.",
    actions: [
      { street: "river", heroPosition: "BTN", villainPosition: "BB", heroAction: "Overbet 150%", villainAction: "?", potAfter: "~40bb" }
    ],
    aiSolution: {
      recommendation: "bet",
      frequency: "100% with nut flush",
      reasoning: "With the nuts, you want to extract maximum value. Villain's range includes Kx, sets, two-pair, and worse flushes. An overbet looks polarized but gets called by players who can't fold strong made hands."
    },
    exploitAdjustment: {
      vsPassive: "Overbet 200%. Passive players call huge bets with strong hands.",
      vsAggressive: "Standard sizing (75%). Aggressive players might raise overbets.",
      vsTight: "Overbet may get folds. Consider 100% pot instead."
    },
    relatedWikiTerms: ["overbet", "value-bet", "polarized-range", "nut-advantage"],
    difficulty: "advanced",
    tags: ["river", "overbet", "value", "nuts"]
  },
  {
    slug: "min-raise-bluff-preflop",
    title: "Preflop Min-Raise from Late Position",
    category: "preflop",
    heroHand: "Suited Gapper",
    description: "Using small sizing to steal blinds efficiently with marginal hands from late position.",
    whenItHappens: "Everyone folds to you on BTN with K9o. A min-raise risks less while still putting pressure on the blinds.",
    actions: [
      { street: "preflop", heroPosition: "BTN", villainPosition: "SB+BB", heroAction: "Min-raise 2bb", villainAction: "?", potAfter: "3.5bb" }
    ],
    aiSolution: {
      recommendation: "raise",
      frequency: "70-80% of hands from BTN",
      reasoning: "Min-raising gives great pot odds for a steal. You only need blinds to fold 40% of the time to profit. The small sizing doesn't commit you and allows easy folds vs 3-bets."
    },
    exploitAdjustment: {
      vsTight: "Min-raise 85%+. Tight blinds fold too much.",
      vsLoose: "Standard 2.5x sizing with a tighter range.",
      vsAggressive: "Min-raise less; expect frequent 3-bets."
    },
    relatedWikiTerms: ["steal", "position", "bet-sizing", "dead-money"],
    difficulty: "beginner",
    tags: ["preflop", "steal", "sizing", "position"]
  },
  {
    slug: "probe-bet-turn",
    title: "Probe Bet When PFR Checks Back Flop",
    category: "turn",
    heroHand: "Middle Pair",
    board: "Jc7h2s5d",
    description: "Taking the initiative when the preflop raiser shows weakness by checking back the flop.",
    whenItHappens: "You defended BB with 98s. Flop J72. CO checks back. Turn 5. Time to probe for information and value.",
    actions: [
      { street: "flop", heroPosition: "BB", villainPosition: "CO", heroAction: "Check", villainAction: "Check", potAfter: "5.5bb" },
      { street: "turn", heroPosition: "BB", villainPosition: "CO", heroAction: "Bet 50%", villainAction: "?", potAfter: "8.25bb" }
    ],
    aiSolution: {
      recommendation: "bet",
      frequency: "50-60% of range as probe bet",
      reasoning: "When the PFR checks back, their range is capped and weak. They likely have Ax, small pairs, or backdoor draws. A probe bet takes advantage of their weakness and can win the pot or get called by worse."
    },
    exploitAdjustment: {
      vsPassive: "Probe less; passive players trap more often.",
      vsAggressive: "Probe with strong hands to induce raises.",
      vsTight: "Probe wide; tight players check back medium-strength hands."
    },
    relatedWikiTerms: ["probe-bet", "initiative", "capped-range", "turn-play"],
    difficulty: "intermediate",
    tags: ["turn", "probe-bet", "initiative", "bluff"]
  }
];

export function getSpotBySlug(slug: string): PokerSpot | undefined {
  return pokerSpots.find(spot => spot.slug === slug);
}

export function getSpotsByCategory(category: SpotCategory): PokerSpot[] {
  return pokerSpots.filter(spot => spot.category === category);
}

export function getSpotsByDifficulty(difficulty: PokerSpot["difficulty"]): PokerSpot[] {
  return pokerSpots.filter(spot => spot.difficulty === difficulty);
}
