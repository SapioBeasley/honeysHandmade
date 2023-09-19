import { FC } from 'react';

type FulfillmentInputProps = {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  index: number;
};

const FulfillmentInput: FC<FulfillmentInputProps> = ({
  handleChange,
  index,
}) => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='col-span-2'>
        <input
          type='datetime-local'
          name={`fulfillments[${index}].shipDate`}
          required
          onChange={handleChange}
          className='p-2 border rounded w-full'
        />
      </div>

      <div>
        <label htmlFor={`carrierName${index}`}>Carrier Name:</label>
        <input
          type='text'
          id={`carrierName${index}`}
          name={`fulfillments[${index}].carrierName`}
          placeholder='Carrier Name'
          maxLength={100}
          required
          onChange={handleChange}
          className='p-2 border rounded w-full'
        />
      </div>

      <div>
        <label htmlFor={`service${index}`}>Service:</label>
        <input
          type='text'
          id={`service${index}`}
          name={`fulfillments[${index}].service`}
          placeholder='Service'
          maxLength={100}
          required
          onChange={handleChange}
          className='p-2 border rounded w-full'
        />
      </div>

      <div>
        <label htmlFor={`trackingNumber${index}`}>Tracking Number:</label>
        <input
          type='text'
          id={`trackingNumber${index}`}
          name={`fulfillments[${index}].trackingNumber`}
          placeholder='Tracking Number'
          maxLength={100}
          required
          onChange={handleChange}
          className='p-2 border rounded w-full'
        />
      </div>

      <div className='col-span-2'>
        <label htmlFor={`trackingUrl${index}`}>Tracking URL:</label>
        <input
          type='url'
          id={`trackingUrl${index}`}
          name={`fulfillments[${index}].trackingUrl`}
          placeholder='https://example.com/track'
          onChange={handleChange}
          className='p-2 border rounded w-full'
        />
      </div>
    </div>
  );
};

export default FulfillmentInput;
