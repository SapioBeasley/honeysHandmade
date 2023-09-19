import { SquarespaceApi } from '@/factories/squarespace';
import { handleApiError } from '@/modules/errorHandling';
import { handleApiSuccess } from '@/modules/successHandling';
import { Product } from '@/types/product';

export const GET = async () => {
  try {
    const allProducts: Product[] = [];

    let cursor = null;
    let hasNextPage = false;

    do {
      const { pagination, products: someProducts } =
        await SquarespaceApi().products.get(cursor);

      hasNextPage = pagination.hasNextPage;
      cursor = pagination.nextPageCursor;

      someProducts.forEach((product) => allProducts.push(product));
    } while (hasNextPage);

    const filteredProducts = allProducts.filter(
      (product) => product.isVisible === true
    );

    return handleApiSuccess<{ products: Product[] }>(
      'Products retrieved successfully',
      { products: filteredProducts }
    );
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
