import { LineItemSchema } from '@/schemas/lineItem';
import { z } from 'zod';

export type LineItem = z.infer<typeof LineItemSchema>;
