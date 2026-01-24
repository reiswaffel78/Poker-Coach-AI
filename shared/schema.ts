import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const handAnalyses = pgTable("hand_analyses", {
  id: serial("id").primaryKey(),
  screenshotUrl: text("screenshot_url"),
  heroCards: text("hero_cards"),
  communityCards: text("community_cards"),
  position: text("position"),
  potSize: text("pot_size"),
  stackSize: text("stack_size"),
  villainAction: text("villain_action"),
  recommendation: text("recommendation").notNull(),
  reasoning: text("reasoning").notNull(),
  confidence: integer("confidence"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const insertHandAnalysisSchema = createInsertSchema(handAnalyses).omit({
  id: true,
  createdAt: true,
});

export type InsertHandAnalysis = z.infer<typeof insertHandAnalysisSchema>;
export type HandAnalysis = typeof handAnalyses.$inferSelect;

export const pokerAnalysisSchema = z.object({
  heroCards: z.string().nullable().optional(),
  communityCards: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  potSize: z.string().nullable().optional(),
  stackSize: z.string().nullable().optional(),
  villainAction: z.string().nullable().optional(),
  recommendation: z.enum(["FOLD", "CHECK", "CALL", "RAISE", "ALL-IN"]),
  reasoning: z.string(),
  confidence: z.number().min(0).max(100).nullable().optional(),
});

export type PokerAnalysis = z.infer<typeof pokerAnalysisSchema>;
