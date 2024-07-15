import React from 'react';
import Button from '../components/Button';

const DeleteConfirmationDialog = ({ onConfirmDelete, onCancelDelete }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md backdrop-brightness-50">
    <div className="p-10 rounded-2xl shadow-2xl text-center transform transition-all duration-200">
      <p className="text-4xl font-extrabold text-white mb-6 drop-shadow-2xl">
        Do you really want to delete this?
      </p>
      <div className="flex justify-center space-x-4">
        <div onClick={onConfirmDelete}>
          <Button text="Delete" />
        </div>
        <div onClick={onCancelDelete}>
          <Button text="No" />
        </div>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationDialog;
