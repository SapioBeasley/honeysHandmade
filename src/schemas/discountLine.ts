import { z } from 'zod';
import { CurrencyValueSchema } from './currencyValue';

export const DiscountLineSchema = z.object({
  promoCode: z.string(),
  name: z.string(),
  amount: CurrencyValueSchema,
});
