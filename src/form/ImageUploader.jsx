import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const ImageUploader = ({ image, setImage, setFile, setImageError }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        setImageError('Image size should be less than 2MB');
        return;
      }
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
      };
      setImage(URL.createObjectURL(file));
      setFile(file);
      sessionStorage.setItem('image', URL.createObjectURL(file));
      setImageError('');
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    setImageSize({ width: 0, height: 0 });
    setFile(null);
    sessionStorage.removeItem('image');
  };

  return (
    <div
      className={`relative w-full border-2 border-dashed border-gray-600 flex items-center justify-center rounded-xl ${image ? '' : 'h-48'}`}
      style={{ height: image ? `${Math.min(imageSize.height, 600)}px` : '12rem' }}
    >
      {image ? (
        <div className="w-full h-full relative">
          <Image
            src={image}
            alt="Uploaded"
            layout="fill"
            objectFit="contain"
            className="rounded-lg shadow-lg"
          />
          <button
            className="absolute top-0 right-0 m-2 p-1 bg-gray-800 text-white rounded-full hover:bg-red-600 transition duration-300"
            onClick={handleImageDelete}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      ) : (
        <>
          <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageUpload} />
          <span className="absolute text-gray-400">Drag & drop or click to add an image</span>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
