import { Order } from '@/types/order';
import { Pagination } from '@/types/pagination';
import { Product } from '@/types/product';

export const SquarespaceApi = () => {
  const BASE_URL = 'https://api.squarespace.com';
  const API_KEY = 'd9892c69-2f73-421e-96d0-7f427ed1ecba';
  const API_VERSION = '1.0';

  const handleResponse = async (response: Response) => {
    const data = await response.json();

    if (!response.ok) {
      // Extract detailed error from response body
      throw new Error(data.message || response.statusText);
    }

    return data;
  };

  const fetchFromApi = async (
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    payload?: Order
  ) => {
    try {
      const headers = {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        ...(endpoint.includes('orders') && {
          'Idempotency-Key': crypto.randomUUID(),
        }),
      };

      const options: RequestInit = {
        method,
        headers,
      };

      if (payload) {
        options.body = JSON.stringify(payload);
      }

      const response = await fetch(
        `${BASE_URL}/${API_VERSION}${endpoint}`,
        options
      );

      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  };

  const orders = {
    create: (payload: Order): Promise<Order> =>
      fetchFromApi(`/commerce/orders`, 'POST', payload),
  };

  const products = {
    get: (
      cursor: string | null
    ): Promise<Pagination & { products: Product[] }> =>
      fetchFromApi(`/commerce/products${cursor ? `?cursor=${cursor}` : ''}`),
  };

  return {
    orders,
    products,
  };
};
