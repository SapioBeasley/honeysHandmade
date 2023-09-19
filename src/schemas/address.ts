import { z } from 'zod';

export const AddressSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  countryCode: z.string(),
  postalCode: z.string().optional(),
  phone: z.string().optional(),
});
