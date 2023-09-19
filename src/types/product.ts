export type Product = {
  // Unique Product id.
  id: string;

  // Product type indicator.
  // `PHYSICAL` is the only value supported at this time.
  type: 'PHYSICAL';

  // Identifier of the product's Store Page.
  storePageId: string;

  // Product name.
  name: string;

  // Long-form product description represented in HTML.
  description: string;

  // Absolute URL of the product details page.
  url: string;

  // URL slug for the new product.
  urlSlug: string;

  // Keywords for search and organization purposes.
  tags: string[];

  // Indicates whether the product is available for purchase.
  isVisible: boolean;

  // Options for search engine optimization.
  seoOptions: {
    // Page title that appears in search results and browser tabs;
    // indexed by search engines.
    title: string;

    // Page description that appears below the title or link in search results.
    description: string;
  };

  // List of attributes to distinguish variants of the product.
  variantAttributes: string[];

  // List of variants of the product.
  variants: {
    // Unique ProductVariant id.
    id: string;

    // Merchant-defined code that identifies the product variant.
    sku: string;

    // Pricing data for the variant.
    pricing: {
      // Amount per unit charged for the variant.
      basePrice: {
        // ISO 4217 currency code string.
        currency: string;

        // Monetary amount.
        value: string;
      };

      // Amount per unit charged when the variant is on sale.
      salePrice: {
        // ISO 4217 currency code string.
        // If `onSale` is false; field defaults to the merchant site's currency setting.
        currency: string;

        // Monetary amount.
        // If `onSale` is false, field coalesces to the lesser of this and `basePrice.value`.
        value: string;
      };

      // Indicates whether the variant is sold according to its sale price.
      onSale: boolean;
    };

    // Available stock for the variant.
    stock: {
      // Number of units that can be purchased.
      quantity: number;

      // Indicates whether the variant has unlimited stock.
      unlimited: boolean;
    };

    // Specifies attribute-value pairs for the variant.
    attributes: Record<string, string>;

    // Measurements of the variant when it's shipped.
    shippingMeasurements: {
      // Weight of the variant.
      weight: {
        // Unit of measurement.
        // Supported values: `KILOGRAM`, `POUND`.
        unit: 'KILOGRAM' | 'POUND';

        // Weight amount.
        value: number;
      };

      // Physical dimensions of the variant.
      dimensions: {
        // Unit of measurement.
        // Supported values: `INCH`, `CENTIMETER`.
        unit: 'INCH' | 'CENTIMETER';

        // Length of the variant.
        length: number;

        // Width of the variant.
        width: number;

        // Height of the variant.
        height: number;
      };
    };

    // Product image assigned to the variant.
    image: {
      id: string;
      title: string;
      url: string;
      originalSize: {
        width: number;
        height: number;
      };
      availableFormats: string[];
    };
  }[];

  // List of product images.
  images: {
    // Unique ProductImage id.
    id: string;

    // Alt text for the image; impacts SEO and appears in search results.
    altText: string;

    // Absolute URL of the image hosted on Squarespace.
    url: string;

    // Image size when first uploaded.
    originalSize: {
      // Width in pixels.
      width: number;

      // Height in pixels.
      height: number;
    };

    // Available image sizes.
    availableFormats: string[];
  }[];

  // ISO 8601 UTC date and time string; represents when the Product was created.
  createdOn: string;

  // ISO 8601 UTC date and time string; represents when the Product was last modified.
  modifiedOn: string;
};
