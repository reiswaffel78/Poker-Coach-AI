import { z } from "zod";

// Hand of the Day types
export const streetActionSchema = z.object({
  street: z.enum(["Preflop", "Flop", "Turn", "River"]),
  action: z.string(),
  potAfter: z.string().optional(),
});

export const handOfTheDaySchema = z.object({
  slug: z.string(),
  title: z.string(),
  spot: z.string(),
  summary: z.string(),
  stakes: z.string(),
  heroPosition: z.string(),
  villainPosition: z.string(),
  heroStack: z.string(),
  villainStack: z.string(),
  heroCards: z.string(),
  communityCards: z.string().optional(),
  actions: z.array(streetActionSchema),
  aiRecommendation: z.enum(["FOLD", "CHECK", "CALL", "RAISE", "ALL-IN"]),
  aiReasoning: z.string(),
  alternatives: z.array(z.object({
    action: z.string(),
    reasoning: z.string(),
  })),
  commonMistakes: z.array(z.string()),
  publishedAt: z.string(),
});

export type StreetAction = z.infer<typeof streetActionSchema>;
export type HandOfTheDay = z.infer<typeof handOfTheDaySchema>;

// Wiki/Glossary types
export const wikiTermSchema = z.object({
  slug: z.string(),
  term: z.string(),
  definition: z.string(),
  formula: z.string().optional(),
  example: z.string(),
  relatedTerms: z.array(z.string()),
  category: z.enum(["basics", "strategy", "math", "positions", "actions"]),
});

export type WikiTerm = z.infer<typeof wikiTermSchema>;

// Famous Hands types
export const famousHandSchema = z.object({
  slug: z.string(),
  title: z.string(),
  event: z.string(),
  year: z.number(),
  players: z.array(z.string()),
  summary: z.string(),
  humanDecision: z.string(),
  humanReasoning: z.string(),
  aiRecommendation: z.enum(["FOLD", "CHECK", "CALL", "RAISE", "ALL-IN"]),
  aiReasoning: z.string(),
  verdict: z.string(),
  lesson: z.string(),
});

export type FamousHand = z.infer<typeof famousHandSchema>;
