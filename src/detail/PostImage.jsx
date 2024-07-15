import React from 'react';
import Image from 'next/image';

const PostImage = ({ image }) => (
  <div className="w-full h-96 rounded-lg overflow-hidden relative">
    {image && (
      <Image src={image} alt="Uploaded" layout="fill" objectFit="cover" />
    )}
  </div>
);

export default PostImage;
