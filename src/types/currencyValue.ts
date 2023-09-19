import { CurrencyValueSchema } from '@/schemas/currencyValue';
import { z } from 'zod';

export type CurrencyValue = z.infer<typeof CurrencyValueSchema>;
