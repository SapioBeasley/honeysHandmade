import { ShippingLineSchema } from './../../../schemas/shippingLine';
import { OrderSchema } from '@/schemas/order';
import { CurrencyValue } from '@/types/currencyValue';
import { LineItem } from '@/types/lineItem';
import { Order } from '@/types/order';
import { Decimal } from 'decimal.js';
import { SquarespaceApi } from '@/factories/squarespace';
import { handleApiError } from '@/modules/errorHandling';
import { handleApiSuccess } from '@/modules/successHandling';

const calculateGrandTotal = (order: Order): CurrencyValue => {
  let total = new Decimal(0);

  for (const item of order.lineItems) {
    const quantity = new Decimal(item.quantity.toString());
    const price = new Decimal(item.unitPricePaid.value);
    total = total.plus(quantity.times(price));
  }

  return {
    currency: `${order.lineItems[0]?.unitPricePaid.currency || 'USD'}`,
    value: total.toFixed(2),
  };
};

export const POST = async (req: Request) => {
  try {
    const payload = await req.json();

    if (!payload.lineItems.length) {
      throw new Error('Order must have at least one line item.');
    }

    const validatedLineItems: LineItem[] = payload.lineItems.map(
      (item: LineItem) => {
        const quantity = Number(item.quantity);
        if (isNaN(quantity)) {
          throw new Error('Quantity must be a number');
        }

        delete item.id;
        delete item.isManual;

        return {
          ...item,
          quantity,
          ...(item.variantId && {
            title: null,
            lineItemType: 'PHYSICAL_PRODUCT',
          }),
          ...(!item.variantId && {
            lineItemType: 'CUSTOM',
            variantId: null,
          }),
        };
      }
    );

    const orderPayload = OrderSchema.parse({
      ...payload,
      channelName: "Honey's Handmade Order Script",
      grandTotal: calculateGrandTotal(payload),
      lineItems: validatedLineItems,
      fulfillments: [],
      ...(payload.shippingAddress && {
        shippingLines: [
          {
            method: 'Flat Rate',
            amount: {
              currency: 'USD',
              value: '0.00',
            },
          },
        ],
      }),
    });

    const order = await SquarespaceApi().orders.create(orderPayload);
    // const order: Order = orderPayload;

    return handleApiSuccess<{ order: Order }>('Order Created', {
      order,
    });
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
