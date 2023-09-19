import { FC } from 'react';

type AddressInputProps = {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type: 'billingAddress' | 'shippingAddress';
};

const AddressInput: FC<AddressInputProps> = ({ handleChange, type }) => {
  return (
    <>
      <div className='grid grid-cols-2 gap-4 mb-2'>
        <input
          type='text'
          name={`${type}[firstName]`}
          placeholder='First Name'
          className='w-full p-2 border rounded mt-2'
          onChange={handleChange}
        />

        <input
          type='text'
          name={`${type}[lastName]`}
          placeholder='Last Name'
          className='w-full p-2 border rounded mt-2'
          onChange={handleChange}
        />
      </div>
      <div className='mb-2'>
        <input
          type='text'
          name={`${type}[address1]`}
          placeholder='Address 1'
          className='block w-full p-2 border rounded mt-2'
          onChange={handleChange}
        />
      </div>
      <div className='mb-2'>
        <input
          type='text'
          name={`${type}[address2]`}
          placeholder='Address 2'
          className='block w-full p-2 border rounded mt-2'
          onChange={handleChange}
        />
      </div>
      <div className='grid grid-cols-3 gap-4 mb-2'>
        <input
          type='text'
          name={`${type}[city]`}
          placeholder='City'
          className='w-full p-2 border rounded mt-2'
          onChange={handleChange}
        />

        <input
          type='text'
          name={`${type}[state]`}
          placeholder='State'
          className='w-full p-2 border rounded mt-2'
          onChange={handleChange}
        />

        <input
          type='text'
          name={`${type}[postalCode]`}
          placeholder='Postal Code'
          className='w-full p-2 border rounded mt-2'
          onChange={handleChange}
        />
      </div>
      <div className='mb-2'>
        <input
          type='text'
          name={`${type}[countryCode]`}
          placeholder='Country Code'
          className='block w-full p-2 border rounded mt-2'
          onChange={handleChange}
        />
      </div>
      <div className='mb-2'>
        <input
          type='text'
          name={`${type}[phone]`}
          placeholder='Phone'
          className='block w-full p-2 border rounded mt-2'
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default AddressInput;
