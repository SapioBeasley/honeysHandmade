import { FC } from 'react';

const Modal: FC<{ content: string; onClose: () => void }> = ({
  content,
  onClose,
}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-4 rounded shadow-lg max-w-md'>
        <p>{content}</p>
        <button
          onClick={onClose}
          className='mt-4 bg-red-500 text-white p-2 rounded'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
