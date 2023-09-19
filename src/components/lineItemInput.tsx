import { Product } from '@/types/product';
import { Variant } from '@/types/variant';
import React, { FC, useState } from 'react';

type LineItemProps = {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  index: number;
  isManual?: boolean;
};

const LineItemInput: FC<LineItemProps> = ({
  handleChange,
  index,
  isManual = false,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useState(() => {
    const getProducts = async () => {
      if (typeof window !== 'undefined') {
        const response = await fetch(`${window.location.origin}/api/products`);
        const data = await response.json();

        if (!response.ok) {
          // openModal(`Failed to fetch products: ${data.message}`);
          return;
        }

        setProducts(data.products);
      }
    };

    getProducts();
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredProducts([]);
    }
  };

  const selectProduct = (product: Product) => {
    setFilteredProducts([]);
    setSearchTerm('');

    setSelectedProduct(product);
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariant(JSON.parse(e.target.value));

    handleChange(e); // if you still want the parent component to be informed
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const objectToString = (obj: any) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];

    return `${capitalizeFirstLetter(key)}: ${capitalizeFirstLetter(value)}`;
  };

  return (
    <div className='line-item-input grid grid-cols-3 gap-3 space-y-2'>
      {!isManual && (
        <div className='flex flex-col col-span-3'>
          <label className='font-bold'>Product Search:</label>
          <input
            type='text'
            placeholder='Search product...'
            className='p-2 border rounded'
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {filteredProducts.length > 0 && (
            <div className='product-dropdown'>
              {filteredProducts.map((product, idx) => (
                <div key={idx} onClick={() => selectProduct(product)}>
                  {product.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {(isManual || selectedProduct) && (
        <>
          {/* <div className='flex flex-col col-span-3'>
            <label className='font-bold'>Type</label>
            <select
              name={`lineItems[${index}].lineItemType`}
              onChange={handleChange}
              className='p-2 border rounded'
              required
            >
              <option value='PHYSICAL_PRODUCT'>Physical Product</option>
              <option value='CUSTOM'>Custom</option>
            </select>
          </div> */}

          <div className='flex flex-col col-span-3'>
            <label className='font-bold'>Title:</label>
            <input
              type='text'
              name={`lineItems[${index}].title`}
              placeholder='Title'
              className='p-2 border rounded'
              onChange={handleChange}
              disabled={!isManual}
              value={selectedProduct && selectedProduct.name}
            />
          </div>

          {selectedProduct &&
            selectedProduct.variants &&
            selectedProduct.variants.length > 0 && (
              <div className='flex flex-col col-span-3'>
                <label className='font-bold'>Select Variant:</label>

                <select
                  name={`lineItems[${index}].variant`}
                  onChange={handleVariantChange}
                  className='p-2 border rounded'
                  required
                >
                  {selectedProduct.variants.map((variant) => (
                    <option key={variant.id} value={JSON.stringify(variant)}>
                      {`(${variant.sku}) ${
                        Object.keys(variant.attributes).length > 0
                          ? objectToString(variant.attributes)
                          : selectedProduct.name
                      } - ${variant.pricing.basePrice.value}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

          <div className='flex flex-col col-span-1'>
            <label className='font-bold'>Variant ID:</label>
            <input
              type='text'
              name={`lineItems[${index}].variantId`}
              placeholder='Variant ID'
              className='p-2 border rounded'
              disabled
              onChange={handleChange}
              value={
                selectedProduct &&
                (selectedVariant?.id || selectedProduct.variants[0].id)
              }
            />
          </div>

          <div className='flex flex-col col-span-1'>
            <label className='font-bold'>Quantity:</label>
            <input
              type='number'
              name={`lineItems[${index}].quantity`}
              placeholder='Quantity'
              className='p-2 border rounded'
              onChange={handleChange}
              required
            />
          </div>

          <div className='flex flex-col col-span-3'>
            <label className='font-bold'>Unit Price Paid</label>
            <div className='flex space-x-1'>
              <select
                name={`lineItems[${index}].unitPricePaid.currency`}
                onChange={handleChange}
                required
                className='p-2 border rounded'
              >
                <option value='USD'>USD</option>
              </select>
              <input
                type='text'
                name={`lineItems[${index}].unitPricePaid.value`}
                placeholder='12.99'
                className='p-2 border rounded flex-grow'
                onChange={handleChange}
                required
                value={
                  '0.00'
                  // selectedVariant?.pricing.basePrice.value ||
                  // selectedProduct.variants[0].pricing.basePrice.value
                }
              />
            </div>
          </div>
          <div className='flex flex-col col-span-3'>
            <label className='font-bold'>Non Sale Unit Price</label>
            <div className='flex space-x-1'>
              <select
                name={`lineItems[${index}].nonSaleUnitPrice.currency`}
                onChange={handleChange}
                required
                className='p-2 border rounded'
              >
                <option value='USD'>USD</option>
              </select>
              <input
                type='text'
                name={`lineItems[${index}].nonSaleUnitPrice.value`}
                placeholder='15.99'
                className='p-2 border rounded flex-grow'
                onChange={handleChange}
                value={'0.00'}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LineItemInput;
