import { z } from 'zod';
import { CurrencyValueSchema } from './currencyValue';

export const LineItemSchema = z.object({
  id: z.string().optional(),
  lineItemType: z.union([z.literal('PHYSICAL_PRODUCT'), z.literal('CUSTOM')]),
  variantId: z.string().optional(),
  title: z.string().optional(),
  quantity: z.number(),
  unitPricePaid: CurrencyValueSchema,
  nonSaleUnitPrice: CurrencyValueSchema.optional(),
  isManual: z.boolean().optional(),
});
