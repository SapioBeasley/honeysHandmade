import { z } from 'zod';
import { CurrencyValue } from './currencyValue';

export type Variant = {
  id: string;
  sku: string;
  pricing: {
    basePrice: CurrencyValue;
  };
  attributes: {
    [key: string]: string;
  };
};
