import { OrderSchema } from '@/schemas/order';
import { z } from 'zod';

export type Order = z.infer<typeof OrderSchema>;
