import React from 'react';

const SavingIndicator = ({ isSaving }) => {
  return (
    <div className={`saving-indicator ${isSaving ? 'visible' : ''}`}>
      Saving...
    </div>
  );
};

export default SavingIndicator;
