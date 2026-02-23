import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import express from "express";
import { openai, speechToText, ensureCompatibleFormat } from "./replit_integrations/audio/client";

const audioBodyParser = express.json({ limit: "50mb" });

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.stt.path, audioBodyParser, async (req, res) => {
    try {
      const { audio } = req.body;
      if (!audio) return res.status(400).json({ message: "No audio provided" });
      const rawBuffer = Buffer.from(audio, "base64");
      const { buffer: audioBuffer, format: inputFormat } = await ensureCompatibleFormat(rawBuffer);
      const text = await speechToText(audioBuffer, inputFormat);
      res.json({ text });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "STT Failed" });
    }
  });

  app.post(api.complaints.analyzeAndCreate.path, async (req, res) => {
    try {
      const input = api.complaints.analyzeAndCreate.input.parse(req.body);
      
      const prompt = `Analyze the following consumer complaint and provide a JSON response.
Complaint: "${input.content}"
Product Category: ${input.productCategory || 'Not specified'}

Return a JSON object strictly following this structure:
{
  "type": "Defective Product" | "Overpricing" | "Fake Product" | "No Refund" | "Misleading Advertisement" | "Service Deficiency" | "Other",
  "emotionalTone": "Frustration" | "Urgency" | "Neutral" | "Anger",
  "consumerRights": ["Right to Safety", "Right to Information", "Right to Choose", "Right to be Heard", "Right to Redressal", "Right to Consumer Education"] (Pick 1-3 applicable),
  "suggestedAction": "String explaining immediate next steps",
  "successProbability": Number between 0 and 100 representing estimated success rate based on details provided,
  "generatedLetter": "A formal, legally structured complaint letter addressed to the consumer court or company, referencing the Consumer Protection Act."
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-5.1",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const analysis = JSON.parse(response.choices[0]?.message?.content || "{}");

      const complaint = await storage.createComplaint({
        content: input.content,
        city: input.city,
        productCategory: input.productCategory,
        type: analysis.type,
        emotionalTone: analysis.emotionalTone,
        generatedLetter: analysis.generatedLetter,
      });

      res.status(201).json({
        complaint,
        analysis: {
          type: analysis.type || "Other",
          emotionalTone: analysis.emotionalTone || "Neutral",
          consumerRights: analysis.consumerRights || [],
          suggestedAction: analysis.suggestedAction || "File a formal complaint.",
          successProbability: analysis.successProbability || 50,
        }
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.complaints.getDashboardStats.path, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
