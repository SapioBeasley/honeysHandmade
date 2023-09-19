import { z } from 'zod';
import { CurrencyValueSchema } from './currencyValue';
import { FulfillmentSchema } from './fulfillment';
import { AddressSchema } from './address';
import { LineItemSchema } from './lineItem';
import { ShippingLineSchema } from './shippingLine';
import { DiscountLineSchema } from './discountLine';

export const OrderSchema = z.object({
  channelName: z.literal("Honey's Handmade Order Script"),
  externalOrderReference: z.string().max(200),
  customerEmail: z.string().email().optional(),
  billingAddress: AddressSchema.optional(),
  shippingAddress: AddressSchema.optional(),
  inventoryBehavior: z
    .union([z.literal('DEDUCT'), z.literal('SKIP')])
    .optional(),
  lineItems: z.array(LineItemSchema),
  shippingLines: z.array(ShippingLineSchema).optional(),
  discountLines: z.array(DiscountLineSchema).optional(),
  priceTaxInterpretation: z.union([
    z.literal('EXCLUSIVE'),
    z.literal('INCLUSIVE'),
  ]),
  subtotal: CurrencyValueSchema.optional(),
  shippingTotal: CurrencyValueSchema.optional(),
  discountTotal: CurrencyValueSchema.optional(),
  taxTotal: CurrencyValueSchema.optional(),
  grandTotal: CurrencyValueSchema,
  fulfillmentStatus: z
    .union([z.literal('PENDING'), z.literal('FULFILLED')])
    .optional(),
  shopperFulfillmentNotificationBehavior: z
    .union([z.literal('SEND'), z.literal('SKIP')])
    .optional(),
  fulfilledOn: z.string().optional(), // Can be further validated to ensure it's an ISO 8601 UTC date-time string
  fulfillments: z.array(FulfillmentSchema),
  createdOn: z.string(), // Can be further validated to ensure it's an ISO 8601 UTC date-time string
});
