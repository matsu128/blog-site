"use client";

import React from 'react';

const EmailInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="email"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default EmailInput;
