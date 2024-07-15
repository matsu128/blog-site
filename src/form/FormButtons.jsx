import React from 'react';
import { useRouter } from 'next/router';
import Button from '../components/Button';

const FormButtons = ({ isUpdate, handleSubmit, errorMessage }) => {
  const router = useRouter();

  return (
    <div className="flex justify-between mt-4">
      <div onClick={() => router.push('/')}>
        <Button text="Back" />
      </div>

      <div className="flex-grow text-center">
        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
      </div>

      <div onClick={handleSubmit}>
        <Button text={isUpdate ? 'Update' : 'Post'} />
      </div>
    </div>
  );
};

export default FormButtons;
