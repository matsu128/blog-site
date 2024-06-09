"use client";

import React from 'react';

const TextArea = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
