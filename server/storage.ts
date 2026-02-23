import { db } from "./db";
import { complaints, type InsertComplaint, type Complaint } from "@shared/schema";
import { desc, sql } from "drizzle-orm";

export interface IStorage {
  createComplaint(complaint: InsertComplaint): Promise<Complaint>;
  getDashboardStats(): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  async createComplaint(complaint: InsertComplaint): Promise<Complaint> {
    const [created] = await db.insert(complaints).values(complaint).returning();
    return created;
  }

  async getDashboardStats(): Promise<any> {
    const commonTypes = await db
      .select({ type: complaints.type, count: sql<number>`count(*)` })
      .from(complaints)
      .where(sql`${complaints.type} IS NOT NULL`)
      .groupBy(complaints.type)
      .orderBy(desc(sql`count(*)`))
      .limit(5);

    const cityTrends = await db
      .select({ city: complaints.city, count: sql<number>`count(*)` })
      .from(complaints)
      .where(sql`${complaints.city} IS NOT NULL`)
      .groupBy(complaints.city)
      .orderBy(desc(sql`count(*)`))
      .limit(5);

    const categoryInsights = await db
      .select({ category: complaints.productCategory, count: sql<number>`count(*)` })
      .from(complaints)
      .where(sql`${complaints.productCategory} IS NOT NULL`)
      .groupBy(complaints.productCategory)
      .orderBy(desc(sql`count(*)`))
      .limit(5);

    return {
      commonTypes: commonTypes.map(t => ({ type: t.type || 'Unknown', count: Number(t.count) })),
      cityTrends: cityTrends.map(c => ({ city: c.city || 'Unknown', count: Number(c.count) })),
      categoryInsights: categoryInsights.map(c => ({ category: c.category || 'Unknown', count: Number(c.count) })),
    };
  }
}

export const storage = new DatabaseStorage();
