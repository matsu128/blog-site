"use client";

import React from 'react';

const Checkbox = ({ children, ...props }) => {
  return (
    <label>
      <input type="checkbox" {...props} />
      {children}
    </label>
  );
};

export default Checkbox;
