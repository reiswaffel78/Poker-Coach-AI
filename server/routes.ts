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

const POKER_ANALYSIS_PROMPT = `You are an expert poker coach. Analyze this screenshot and recommend the optimal action.

Consider: pot odds, hand equity, position, stack depths, and opponent tendencies.

Respond with JSON only (no markdown):
{"heroCards":"As Kh","communityCards":"Qh Jd 5c or null if preflop","position":"BTN/SB/BB/UTG/MP/CO","potSize":"150BB","stackSize":"100BB","villainAction":"Raise 3BB or Check","recommendation":"FOLD|CHECK|CALL|RAISE|ALL-IN","reasoning":"Explain your recommendation considering pot odds, equity, and position. Be specific about the math when relevant.","confidence":85}`;

const ROAST_ANALYSIS_PROMPT = `You are a legendary poker player who's seen it all and has a sharp wit. Analyze this screenshot and give your brutally honest, humorous assessment of this hand - but always stay educational and constructive.

Your style: Think Phil Hellmuth meets a stand-up comedian. Be sarcastic and witty, but never mean-spirited. After the roast, always explain WHY this play is questionable and what the correct play is.

Guidelines:
- Start with a playful jab at the situation (e.g., "Ah yes, the classic 'I have top pair so I'm basically Phil Ivey' move...")
- Point out the specific mistake in a funny way
- Then give actual strategic advice
- End with encouragement - we're here to learn!

Respond with JSON only (no markdown):
{"heroCards":"As Kh","communityCards":"Qh Jd 5c or null if preflop","position":"BTN/SB/BB/UTG/MP/CO","potSize":"150BB","stackSize":"100BB","villainAction":"Raise 3BB or Check","recommendation":"FOLD|CHECK|CALL|RAISE|ALL-IN","reasoning":"Your roast goes here - be funny but educational! Start with the joke, explain the mistake, give the correct play, and end positively.","confidence":85}`;

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
      const { image, mode = "normal" } = req.body;
      
      if (!image) {
        return res.status(400).json({ error: "Image data is required" });
      }

      // Select prompt based on mode
      const prompt = mode === "roast" ? ROAST_ANALYSIS_PROMPT : POKER_ANALYSIS_PROMPT;

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
              { text: prompt },
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

      // Try to parse the JSON, with fallback cleanup if it fails
      let parsed;
      try {
        parsed = JSON.parse(cleanedContent);
      } catch (parseError) {
        // If parsing fails, try more aggressive cleanup
        console.log("Initial JSON parse failed, attempting cleanup...");
        
        // Remove all control characters and normalize whitespace
        let sanitized = cleanedContent
          .replace(/[\x00-\x1F\x7F]/g, ' ')  // Replace all control chars with space
          .replace(/\s+/g, ' ')               // Collapse multiple spaces
          .trim();
        
        // Try to extract just the JSON object
        const jsonMatch = sanitized.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/);
        if (jsonMatch) {
          sanitized = jsonMatch[0];
        }
        
        try {
          parsed = JSON.parse(sanitized);
        } catch (secondError) {
          console.log("Sanitized content:", sanitized.substring(0, 500));
          throw parseError; // Throw original error for better debugging
        }
      }
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
        mode: mode,
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

  // Download Chrome extension as ZIP
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

  // Download Firefox extension as ZIP
  app.get("/api/firefox-extension/download", async (req, res) => {
    try {
      const extensionPath = path.join(process.cwd(), "firefox-extension");
      
      if (!fs.existsSync(extensionPath)) {
        return res.status(404).json({ error: "Firefox extension folder not found" });
      }

      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", "attachment; filename=poker-coach-firefox-extension.zip");

      const archive = archiver("zip", { zlib: { level: 9 } });
      
      archive.on("error", (err) => {
        console.error("Archive error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to create ZIP" });
        }
      });

      archive.pipe(res);
      archive.directory(extensionPath, "poker-coach-firefox-extension");
      await archive.finalize();
    } catch (error) {
      console.error("Error creating Firefox extension ZIP:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download Firefox extension" });
      }
    }
  });

  return httpServer;
}
