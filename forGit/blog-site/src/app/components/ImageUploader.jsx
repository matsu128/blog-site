"use client";

import React from 'react';

const ImageUploader = () => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log('Uploaded file:', file);
  };

  return (
    <input type="file" accept="image/*" onChange={handleImageUpload} />
  );
};

export default ImageUploader;
