import { z } from 'zod';

export const CurrencyValueSchema = z.object({
  currency: z.string(),
  value: z.string(),
});
