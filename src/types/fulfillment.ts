import { FulfillmentSchema } from '@/schemas/fulfillment';
import { z } from 'zod';

export type Fulfillment = z.infer<typeof FulfillmentSchema>;
