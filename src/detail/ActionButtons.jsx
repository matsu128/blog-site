import React from 'react';
import Button from '../components/Button';

const ActionButtons = ({ viewMode, onBack, onEdit, onDelete }) => (
  <div className={`flex justify-center mt-6 ${viewMode === 'myself' ? 'space-x-10' : ''}`}>
    <div onClick={onBack}>
      <Button text="Back" />
    </div>
    {viewMode === 'myself' && (
      <>
        <div onClick={onEdit}>
          <Button text="Edit" />
        </div>
        <div onClick={onDelete}>
          <Button text="Delete" />
        </div>
      </>
    )}
  </div>
);

export default ActionButtons;
