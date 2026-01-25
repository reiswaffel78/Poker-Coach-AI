import type { FamousHand } from "@shared/content-types";

export const famousHands: FamousHand[] = [
  {
    slug: "durrrr-vs-greenstein-high-stakes-poker",
    title: "Durrrr's Legendary Bluff vs Barry Greenstein",
    event: "High Stakes Poker Season 5",
    year: 2008,
    players: ["Tom 'durrrr' Dwan", "Barry Greenstein"],
    summary: "In one of the most famous televised poker bluffs, Tom Dwan makes a massive overbet bluff against Barry Greenstein, representing a hand he doesn't have on a scary river card.",
    humanDecision: "ALL-IN (Bluff Overbet)",
    humanReasoning: "Dwan recognized that the river card completed multiple draws and represented extreme strength with a huge overbet. He leveraged Greenstein's tight image and his own wild reputation to create maximum fold equity.",
    aiRecommendation: "FOLD",
    aiReasoning: "From a pure GTO perspective, this bluff frequency is too high given the bet sizing and board texture. The overbet commits significant chips with minimal equity if called. However, Dwan's exploitative read on Greenstein's tendency to fold in close spots made this +EV against this specific opponent.",
    verdict: "Human wins! Greenstein folded, and the bluff worked perfectly. This hand shows how exploitative play can outperform theory when you have strong reads.",
    lesson: "GTO provides a baseline, but poker is played against humans. Strong hand-reading and opponent exploitation can justify plays that seem theoretically incorrect."
  },
  {
    slug: "ivey-vs-jackson-monte-carlo",
    title: "Phil Ivey's Soul Read vs Paul Jackson",
    event: "Monte Carlo Millions",
    year: 2005,
    players: ["Phil Ivey", "Paul Jackson"],
    summary: "Phil Ivey makes an incredible call with just Queen-high, correctly reading his opponent's bluff in a massive pot during a high-stakes cash game.",
    humanDecision: "CALL (with Queen-high)",
    humanReasoning: "Ivey picked up on timing tells and betting patterns that suggested Jackson was bluffing. Despite having no pair, Ivey trusted his read and made one of the most famous hero calls in poker history.",
    aiRecommendation: "FOLD",
    aiReasoning: "Calling river bets with Queen-high is rarely correct from a mathematical standpoint. The pot odds don't justify the call frequency needed, and Q-high is near the bottom of any reasonable calling range. Without live tells and meta-game information, this is a clear fold.",
    verdict: "Human wins! Jackson was indeed bluffing with Ten-high, and Ivey's read was spot-on. This legendary call cemented Ivey's reputation as one of the greatest readers of opponents.",
    lesson: "AI analysis can't capture live tells, timing patterns, and psychological reads that elite players use. Human intuition remains a powerful weapon at the highest stakes."
  }
];
