import { z } from 'zod';

export const FulfillmentSchema = z.object({
  id: z.string().optional(),
  shipDate: z.string(), // Can be further validated to ensure it's an ISO 8601 UTC date-time string
  carrierName: z.string(),
  service: z.string(),
  trackingNumber: z.string(),
  trackingUrl: z.string().url().optional().or(z.literal('')),
});
