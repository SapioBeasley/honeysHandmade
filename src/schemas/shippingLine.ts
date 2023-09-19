import { z } from 'zod';
import { CurrencyValueSchema } from './currencyValue';

export const ShippingLineSchema = z.object({
  method: z.string(),
  amount: CurrencyValueSchema,
});
