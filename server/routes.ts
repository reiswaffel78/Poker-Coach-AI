import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GoogleGenAI } from "@google/genai";
import archiver from "archiver";
import path from "path";
import fs from "fs";
import { pokerAnalysisSchema } from "@shared/schema";

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
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

Antworte NUR mit validem JSON im folgenden Format (keine Markdown-Codeblöcke):
{
  "heroCards": "z.B. 'As Kh' oder null wenn nicht sichtbar",
  "communityCards": "z.B. 'Qh Jd 5c 2s' oder null wenn Preflop",
  "position": "z.B. 'Button', 'Small Blind', 'UTG' oder null",
  "potSize": "z.B. '150 BB' oder null",
  "stackSize": "z.B. '100 BB' oder null",
  "villainAction": "z.B. 'Raise 3BB', 'All-In' oder null",
  "recommendation": "FOLD | CHECK | CALL | RAISE | ALL-IN",
  "reasoning": "Ausführliche deutsche Begründung für die Empfehlung...",
  "confidence": 85
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

  // Analyze screenshot with Gemini
  app.post("/api/analyze", async (req, res) => {
    try {
      const { image } = req.body;
      
      if (!image) {
        return res.status(400).json({ error: "Image data is required" });
      }

      // Extract base64 data and mime type from data URL
      let imageData = image;
      let mimeType = "image/png";
      
      if (image.startsWith("data:")) {
        const matches = image.match(/^data:([^;]+);base64,(.+)$/);
        if (matches) {
          mimeType = matches[1];
          imageData = matches[2];
        } else {
          imageData = image.split(",")[1];
        }
      }

      // Use Gemini for vision analysis
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              { text: POKER_ANALYSIS_PROMPT },
              {
                inlineData: {
                  mimeType: mimeType,
                  data: imageData,
                },
              },
            ],
          },
        ],
      });

      const content = response.text;
      if (!content) {
        throw new Error("No response from AI");
      }

      // Clean up potential markdown code blocks
      let cleanedContent = content.trim();
      if (cleanedContent.startsWith("```json")) {
        cleanedContent = cleanedContent.slice(7);
      } else if (cleanedContent.startsWith("```")) {
        cleanedContent = cleanedContent.slice(3);
      }
      if (cleanedContent.endsWith("```")) {
        cleanedContent = cleanedContent.slice(0, -3);
      }
      cleanedContent = cleanedContent.trim();

      const parsed = JSON.parse(cleanedContent);
      const analysis = pokerAnalysisSchema.parse(parsed);

      // Save to storage
      await storage.createAnalysis({
        screenshotUrl: image.length > 1000 ? null : image,
        heroCards: analysis.heroCards || null,
        communityCards: analysis.communityCards || null,
        position: analysis.position || null,
        potSize: analysis.potSize || null,
        stackSize: analysis.stackSize || null,
        villainAction: analysis.villainAction || null,
        recommendation: analysis.recommendation,
        reasoning: analysis.reasoning,
        confidence: analysis.confidence ?? null,
      });

      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing screenshot:", error);
      
      let errorMessage = "Analyse fehlgeschlagen - bitte erneut versuchen";
      let debugInfo = "";
      
      if (error instanceof Error) {
        debugInfo = error.message;
        
        if (error.message.includes("rate limit") || error.message.includes("429") || error.message.includes("RATELIMIT")) {
          errorMessage = "Zu viele Anfragen - bitte warte kurz";
        } else if (error.message.includes("API key") || error.message.includes("authentication") || error.message.includes("Unauthorized")) {
          errorMessage = "API-Konfigurationsfehler";
        } else if (error.message.includes("JSON")) {
          errorMessage = "KI-Antwort konnte nicht verarbeitet werden";
        } else if (error.message.includes("timeout") || error.message.includes("ETIMEDOUT")) {
          errorMessage = "Zeitüberschreitung - bitte erneut versuchen";
        } else if (error.message.includes("model")) {
          errorMessage = "KI-Modell nicht verfügbar";
        }
      }
      
      console.error("Debug info:", debugInfo);
      res.status(500).json({ error: errorMessage, debug: debugInfo });
    }
  });

  // Download extension as ZIP
  app.get("/api/extension/download", async (req, res) => {
    try {
      const extensionPath = path.join(process.cwd(), "extension");
      
      if (!fs.existsSync(extensionPath)) {
        return res.status(404).json({ error: "Extension folder not found" });
      }

      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", "attachment; filename=poker-coach-extension.zip");

      const archive = archiver("zip", { zlib: { level: 9 } });
      
      archive.on("error", (err) => {
        console.error("Archive error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to create ZIP" });
        }
      });

      archive.pipe(res);
      archive.directory(extensionPath, "poker-coach-extension");
      await archive.finalize();
    } catch (error) {
      console.error("Error creating extension ZIP:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download extension" });
      }
    }
  });

  return httpServer;
}
