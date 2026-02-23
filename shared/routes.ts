import { z } from 'zod';
import { insertComplaintSchema, complaints } from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  complaints: {
    analyzeAndCreate: {
      method: 'POST' as const,
      path: '/api/complaints' as const,
      input: z.object({
        content: z.string(),
        city: z.string().optional(),
        productCategory: z.string().optional(),
      }),
      responses: {
        201: z.object({
          complaint: z.custom<typeof complaints.$inferSelect>(),
          analysis: z.object({
            type: z.string(),
            emotionalTone: z.string(),
            consumerRights: z.array(z.string()),
            suggestedAction: z.string(),
            successProbability: z.number(),
          }),
        }),
        400: errorSchemas.validation,
      },
    },
    getDashboardStats: {
      method: 'GET' as const,
      path: '/api/stats' as const,
      responses: {
        200: z.object({
          commonTypes: z.array(z.object({ name: z.string(), count: z.number() })),
          cityTrends: z.array(z.object({ city: z.string(), count: z.number() })),
          categoryInsights: z.array(z.object({ category: z.string(), count: z.number() })),
          totalComplaints: z.number(),
          resolvedCases: z.number(),
        }),
      },
    },
  },
  stt: {
    method: 'POST' as const,
    path: '/api/stt' as const,
    input: z.object({ audio: z.string() }),
    responses: {
      200: z.object({ text: z.string() }),
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type CreateComplaintInput = z.infer<typeof api.complaints.analyzeAndCreate.input>;
export type CreateComplaintResponse = z.infer<typeof api.complaints.analyzeAndCreate.responses[201]>;
export type DashboardStatsResponse = z.infer<typeof api.complaints.getDashboardStats.responses[200]>;
export type SttResponse = z.infer<typeof api.stt.responses[200]>;
