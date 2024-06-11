"use client";

import React from 'react';

const PasswordInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="password"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default PasswordInput;
