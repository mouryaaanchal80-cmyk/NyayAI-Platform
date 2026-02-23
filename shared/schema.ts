import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const complaints = pgTable("complaints", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  type: text("type"),
  emotionalTone: text("emotionalTone"),
  city: text("city"),
  productCategory: text("productCategory"),
  generatedLetter: text("generatedLetter"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertComplaintSchema = createInsertSchema(complaints).omit({ id: true, createdAt: true });

export type Complaint = typeof complaints.$inferSelect;
export type InsertComplaint = z.infer<typeof insertComplaintSchema>;

export * from "./models/chat";
