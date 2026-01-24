import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { pokerAnalysisSchema } from "@shared/schema";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const POKER_ANALYSIS_PROMPT = `Du bist ein erfahrener professioneller Pokerspieler und Coach. Analysiere den folgenden Poker-Screenshot und gib eine fundierte Handlungsempfehlung.

Bitte analysiere:
1. Die Hole Cards des Spielers (Hero)
2. Die Community Cards (Flop, Turn, River falls sichtbar)
3. Die Position des Spielers am Tisch
4. Die Pot-Größe und Stack-Größen
5. Die Aktionen der Gegner (Villain)

Gib dann eine klare Empfehlung: FOLD, CHECK, CALL, RAISE oder ALL-IN.

Erkläre deine Empfehlung auf Deutsch mit einer detaillierten Begründung, die auf Pot Odds, Equity, Position und Gegnertendenzen eingeht.

Antworte im folgenden JSON-Format:
{
  "heroCards": "z.B. 'As Kh' oder null wenn nicht sichtbar",
  "communityCards": "z.B. 'Qh Jd 5c 2s' oder null wenn Preflop",
  "position": "z.B. 'Button', 'Small Blind', 'UTG' oder null",
  "potSize": "z.B. '150 BB' oder null",
  "stackSize": "z.B. '100 BB' oder null",
  "villainAction": "z.B. 'Raise 3BB', 'All-In' oder null",
  "recommendation": "FOLD | CHECK | CALL | RAISE | ALL-IN",
  "reasoning": "Ausführliche deutsche Begründung für die Empfehlung...",
  "confidence": 0-100
}`;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Get all analyses
  app.get("/api/analyses", async (req, res) => {
    try {
      const analyses = await storage.getAnalyses();
      res.json(analyses);
    } catch (error) {
      console.error("Error fetching analyses:", error);
      res.status(500).json({ error: "Failed to fetch analyses" });
    }
  });

  // Get single analysis
  app.get("/api/analyses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const analysis = await storage.getAnalysis(id);
      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }
      res.json(analysis);
    } catch (error) {
      console.error("Error fetching analysis:", error);
      res.status(500).json({ error: "Failed to fetch analysis" });
    }
  });

  // Analyze screenshot
  app.post("/api/analyze", async (req, res) => {
    try {
      const { image } = req.body;
      
      if (!image) {
        return res.status(400).json({ error: "Image data is required" });
      }

      // Extract base64 data from data URL if present
      let imageData = image;
      if (image.startsWith("data:")) {
        imageData = image.split(",")[1];
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: POKER_ANALYSIS_PROMPT,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/png;base64,${imageData}`,
                },
              },
            ],
          },
        ],
        max_completion_tokens: 2048,
        response_format: { type: "json_object" },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("No response from AI");
      }

      const parsed = JSON.parse(content);
      const analysis = pokerAnalysisSchema.parse(parsed);

      // Save to storage
      const saved = await storage.createAnalysis({
        screenshotUrl: image.length > 1000 ? null : image, // Don't store large base64 strings
        heroCards: analysis.heroCards || null,
        communityCards: analysis.communityCards || null,
        position: analysis.position || null,
        potSize: analysis.potSize || null,
        stackSize: analysis.stackSize || null,
        villainAction: analysis.villainAction || null,
        recommendation: analysis.recommendation,
        reasoning: analysis.reasoning,
        confidence: analysis.confidence,
      });

      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing screenshot:", error);
      
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to analyze screenshot" });
      }
    }
  });

  return httpServer;
}
