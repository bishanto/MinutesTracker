import React from 'react';

const CancelButton = () => {
  const cancel = () => {
    window.history.go(-1);
  };

  return (
    <div>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
};

export default CancelButton;
