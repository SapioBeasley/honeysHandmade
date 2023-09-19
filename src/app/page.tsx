'use client';

import AddressInput from '@/components/addressInput';
import FulfillmentInput from '@/components/fulfillmentInput';
import LineItemInput from '@/components/lineItemInput';
import Modal from '@/components/modal';
import { Fulfillment } from '@/types/fulfillment';
import { LineItem } from '@/types/lineItem';
import { Order } from '@/types/order';
import { Product } from '@/types/product';
import dayjs from 'dayjs';
import { useState } from 'react';

const INVENTORY_BEHAVIORS = [
  { value: 'DEDUCT', label: 'Deduct' },
  { value: 'SKIP', label: 'Skip' },
];

const PRICE_TAX_INTERPRETATIONS = [
  { value: 'EXCLUSIVE', label: 'Exclusive' },
  { value: 'INCLUSIVE', label: 'Inclusive' },
];

const Home = () => {
  const [formData, setFormData] = useState<Order>({
    channelName: "Honey's Handmade Order Script",
    priceTaxInterpretation: 'EXCLUSIVE',
    externalOrderReference: crypto.randomUUID(),
    createdOn: dayjs().toISOString(),
    lineItems: [],
    fulfillments: [
      {
        shipDate: dayjs().toISOString(),
        carrierName: 'USPS',
        service: 'Standard',
        trackingNumber: 'N/A',
      },
    ],
    grandTotal: { value: '0.00', currency: 'USD' },
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');

  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const addressMatch = name.match(/(shippingAddress)\[(\w+)\]/);
    const regexMatch = name.match(/(fulfillments|lineItems)\[(\d+)\]\.(.+)/);

    if (addressMatch) {
      const objectName = addressMatch[1];
      const key = addressMatch[2];

      setFormData((prevState) => ({
        ...prevState,
        [objectName]: {
          ...(prevState[objectName as keyof Order] as Record<string, any>),
          [key]: value,
        },
      }));
    } else if (regexMatch) {
      const arrayName = regexMatch[1];
      const index = parseInt(regexMatch[2]);
      const keyPath = regexMatch[3].split('.'); // Split further to handle nested keys

      setFormData((prevState) => {
        const newArray = [
          ...(prevState[arrayName as keyof Order] as (
            | Fulfillment
            | LineItem
          )[]),
        ];

        let nestedObject: any = newArray[index]; // Start with the item in the array
        keyPath.forEach((key, idx) => {
          if (idx === keyPath.length - 1) {
            nestedObject[key] = value;
          } else {
            // Go one level deeper for each key
            if (!nestedObject[key]) {
              nestedObject[key] = {};
            }
            nestedObject = nestedObject[key];
          }
        });

        return {
          ...prevState,
          [arrayName]: newArray,
        };
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (!response.ok) {
        openModal(`Failed to create order: ${json.message}`);
        return;
      }

      openModal('Order created successfully!');
      return;
    } catch (error) {
      openModal('An error occurred.');
    }
  };

  const handleAddLineItem = (isManual?: boolean) => {
    setFormData((prevState) => ({
      ...prevState,
      lineItems: [
        ...prevState.lineItems,
        {
          id: crypto.randomUUID(),
          lineItemType: 'CUSTOM',
          variantId: null,
          title: '',
          quantity: 1,
          unitPricePaid: {
            currency: 'USD',
            value: '0.00',
          },
          nonSaleUnitPrice: {
            currency: 'USD',
            value: '0.00',
          },
          isManual: isManual || false,
        },
      ],
    }));
  };

  const handleAddFulfillment = () => {
    setFormData((prevState) => ({
      ...prevState,
      fulfillments: [
        ...prevState.fulfillments,
        {
          id: crypto.randomUUID(),
          shipDate: new Date().toISOString(), // Current date-time in ISO 8601 format
          carrierName: '',
          service: '',
          trackingNumber: '',
          trackingUrl: '', // Made it an empty string since it's optional or can be an empty string
        },
      ],
    }));
  };

  const handleRemoveLineItem = (id: string) => {
    setFormData((prevState) => ({
      ...prevState,
      lineItems: prevState.lineItems.filter((item) => item.id !== id),
    }));
  };

  const handleRemoveFulfillment = (id: string) => {
    setFormData((prevState) => ({
      ...prevState,
      fulfillments: prevState.fulfillments.filter((item, i) => item.id !== id),
    }));
  };

  const handleAddManualLineItem = () => {
    handleAddLineItem(true);
  };

  return (
    <div className='bg-gray-200 min-h-screen flex items-center justify-center'>
      <div className='max-w-4xl bg-white border rounded shadow-lg p-8'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex flex-wrap -mx-2'>
            <div className='w-full md:w-1/2 p-2'>
              {/* <input
                type='text'
                name='externalOrderReference'
                placeholder='External Order Reference'
                maxLength={200}
                required
                className='block w-full p-2 border rounded mt-2'
                onChange={handleChange}
              /> */}

              <fieldset className='mt-4 border p-4 rounded'>
                <legend className='font-bold'>Customer Details</legend>
                <input
                  type='email'
                  name='customerEmail'
                  placeholder='Customer Email'
                  className='block w-full p-2 border rounded mt-2'
                  onChange={handleChange}
                  required
                />

                <AddressInput
                  type='shippingAddress'
                  handleChange={handleChange}
                />
              </fieldset>

              {/* <fieldset className='mt-4 border p-4 rounded'>
                <legend className='font-bold'>Billing Address</legend>
                <AddressInput
                  type='billingAddress'
                  handleChange={handleChange}
                />
              </fieldset> */}

              {/* <div className='flex flex-wrap mt-4'>
                <div className='w-1/2 pr-2'>
                  <label htmlFor='fulfilledOn' className='block font-bold'>
                    Fulfilled on:
                  </label>
                  <input
                    type='datetime-local'
                    name='fulfilledOn'
                    placeholder='Fulfilled On'
                    className='block w-full p-2 border rounded'
                    onChange={handleChange}
                  />
                </div> 

               <div className='w-1/2'>
                  <label htmlFor='createdOn' className='block font-bold'>
                    Created On:
                  </label>
                  <input
                    type='datetime-local'
                    name='createdOn'
                    placeholder='Created On'
                    required
                    className='block w-full p-2 border rounded'
                    onChange={handleChange}
                  />
                </div> 
              </div> */}
            </div>

            <div className='w-full md:w-1/2 p-2'>
              <fieldset className='mt-4 border p-4 rounded'>
                <legend className='font-bold'>Line Items</legend>

                {formData.lineItems.map((item, index) => (
                  <div key={item.id} className='mb-4'>
                    <LineItemInput
                      index={index}
                      handleChange={handleChange}
                      isManual={item.isManual}
                    />

                    <button
                      type='button'
                      onClick={() => handleRemoveLineItem(item.id!)}
                      className='mt-2 bg-red-500 text-white rounded p-2'
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  type='button'
                  onClick={() => handleAddLineItem()}
                  className='bg-blue-500 text-white rounded p-2'
                >
                  Add Line Item
                </button>

                <button
                  type='button'
                  onClick={handleAddManualLineItem}
                  className='bg-blue-500 text-white rounded p-2'
                >
                  Add Manual Line Item
                </button>
              </fieldset>

              {/* <fieldset className='mt-4 border p-4 rounded'>
                <legend className='font-bold'>Fulfillments</legend>

                {formData.fulfillments.map((item, index) => (
                  <div key={item.id} className='mb-4'>
                    <FulfillmentInput
                      index={index}
                      handleChange={handleChange}
                    />
                    <button
                      onClick={() => handleRemoveFulfillment(item.id!)}
                      className='mt-2 bg-red-500 text-white rounded p-2'
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  onClick={handleAddFulfillment}
                  className='bg-blue-500 text-white rounded p-2'
                >
                  Add Fulfillment
                </button>
              </fieldset> 

              <div className='grid grid-cols-2 py-4 gap-4'>
                 <label
                  htmlFor='inventoryBehavior'
                  className='mr-2 align-middle'
                >
                  Inventory Behavior:
                </label>
                <select
                  id='inventoryBehavior'
                  name='inventoryBehavior'
                  onChange={handleChange}
                  className='p-2 border rounded'
                >
                  {INVENTORY_BEHAVIORS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select> 

                <label
                  htmlFor='priceTaxInterpretation'
                  className='mr-2 align-middle'
                >
                  Price Tax Interpretation:
                </label>
                <select
                  id='priceTaxInterpretation'
                  name='priceTaxInterpretation'
                  required
                  onChange={handleChange}
                  className='p-2 border rounded'
                >
                  {PRICE_TAX_INTERPRETATIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <label
                  htmlFor='shopperFulfillmentNotificationBehavior'
                  className='mr-2 align-middle'
                >
                  Shopper Fulfillment Notification Behavior:
                </label>
                <select
                  id='shopperFulfillmentNotificationBehavior'
                  name='shopperFulfillmentNotificationBehavior'
                  onChange={handleChange}
                  className='p-2 border rounded'
                >
                  <option value='SEND'>Send</option>
                  <option value='SKIP'>Skip</option>
                </select> 
              </div> */}
            </div>
          </div>

          <input
            type='submit'
            value='Submit Order'
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          />
        </form>
      </div>

      {isModalOpen && <Modal content={modalContent} onClose={closeModal} />}
    </div>
  );
};

export default Home;
