import React from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';

const ViewModeSelector = ({ viewMode, onViewModeChange, userId }) => {
  return (
    <div className="absolute top-20 left-0 right-0 z-10 flex justify-end space-x-4 px-4">
      <PeopleAltIcon className="text-green-600 self-center" />
      <button
        className={`bg-transparent text-green-800 border border-white py-2 px-4 rounded-full hover:bg-white hover:text-black transition duration-300 relative overflow-hidden ${viewMode === 'everyone' ? 'font-bold' : ''}`}
        onClick={() => onViewModeChange('everyone')}
      >
        <span className="relative z-10">everyone</span>
      </button>
      {userId && (
        <>
          <PersonIcon className="text-orange-400 self-center" />
          <button
            className={`bg-transparent text-orange-700 border border-white py-2 px-4 rounded-full hover:bg-white hover:text-black transition duration-300 relative overflow-hidden ${viewMode === 'myself' ? 'font-bold' : ''}`}
            onClick={() => onViewModeChange('myself')}
          >
            <span className="relative z-10">myself</span>
          </button>
        </>
      )}
    </div>
  );
};

export default ViewModeSelector;
