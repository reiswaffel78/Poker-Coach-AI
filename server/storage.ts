import { type User, type InsertUser, type HandAnalysis, type InsertHandAnalysis } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAnalyses(): Promise<HandAnalysis[]>;
  getAnalysis(id: number): Promise<HandAnalysis | undefined>;
  createAnalysis(analysis: InsertHandAnalysis): Promise<HandAnalysis>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private analyses: Map<number, HandAnalysis>;
  private analysisIdCounter: number;

  constructor() {
    this.users = new Map();
    this.analyses = new Map();
    this.analysisIdCounter = 1;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAnalyses(): Promise<HandAnalysis[]> {
    const all = Array.from(this.analyses.values());
    return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getAnalysis(id: number): Promise<HandAnalysis | undefined> {
    return this.analyses.get(id);
  }

  async createAnalysis(insertAnalysis: InsertHandAnalysis): Promise<HandAnalysis> {
    const id = this.analysisIdCounter++;
    const analysis: HandAnalysis = {
      id,
      screenshotUrl: insertAnalysis.screenshotUrl ?? null,
      heroCards: insertAnalysis.heroCards ?? null,
      communityCards: insertAnalysis.communityCards ?? null,
      position: insertAnalysis.position ?? null,
      potSize: insertAnalysis.potSize ?? null,
      stackSize: insertAnalysis.stackSize ?? null,
      villainAction: insertAnalysis.villainAction ?? null,
      recommendation: insertAnalysis.recommendation,
      reasoning: insertAnalysis.reasoning,
      confidence: insertAnalysis.confidence ?? null,
      mode: insertAnalysis.mode ?? "normal",
      createdAt: new Date(),
    };
    this.analyses.set(id, analysis);
    return analysis;
  }
}

export const storage = new MemStorage();
