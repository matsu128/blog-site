"use client";

import React from 'react';

const RadioButton = ({ children, ...props }) => {
  return (
    <label>
      <input type="radio" {...props} />
      {children}
    </label>
  );
};

export default RadioButton;
