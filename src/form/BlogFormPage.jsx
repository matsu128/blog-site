import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import jwt from 'jsonwebtoken';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import ImageUploader from './ImageUploader';
import TitleInput from './TitleInput';
import ContentInput from './ContentInput';
import FormButtons from './FormButtons';

const BlogFormPage = () => {
  const router = useRouter();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageError, setImageError] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTitle = sessionStorage.getItem('title');
      const storedContent = sessionStorage.getItem('content');
      const storedImage = sessionStorage.getItem('image');

      if (storedTitle) {
        setTitle(storedTitle);
        setIsUpdate(true);
      }
      if (storedContent) {
        setContent(storedContent);
      }
      if (storedImage) {
        setImage(storedImage);
      }
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (!title.trim() || !content.trim()) {
        setTitleError(!title.trim());
        setContentError(!content.trim());
        setErrorMessage('Please enter both title and content.');
        return;
      }

      const userId = (jwt.decode(sessionStorage.getItem('token'))).id;
      const postId = sessionStorage.getItem('postId');
      const isUpdate = !!postId;

      let imageUrl = sessionStorage.getItem('image');
      if (file) {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      const requestData = { title, content, imageUrl, userId };
      if (isUpdate) {
        requestData.postId = postId;
      }

      const response = await fetch(`/api/blogform/`, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to save post');
      }

      sessionStorage.removeItem('title');
      sessionStorage.removeItem('content');
      sessionStorage.removeItem('image');
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-2xl space-y-6">
        <ImageUploader image={image} setImage={setImage} setFile={setFile} setImageError={setImageError} />
        {imageError && <p className="text-red-500 text-sm text-center">{imageError}</p>}
        <TitleInput title={title} setTitle={setTitle} titleError={titleError} setTitleError={setTitleError} setErrorMessage={setErrorMessage} />
        <ContentInput content={content} setContent={setContent} contentError={contentError} setContentError={setContentError} setErrorMessage={setErrorMessage} />
        <FormButtons isUpdate={isUpdate} handleSubmit={handleSubmit} errorMessage={errorMessage} />
      </div>
    </div>
  );
};

export default BlogFormPage;
