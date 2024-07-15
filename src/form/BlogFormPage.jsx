import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import Button from '../components/Button';
import sanitizeHtml from 'sanitize-html';
import jwt from 'jsonwebtoken';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const BlogFormPage = () => {
  const router = useRouter();

  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
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
      // Retrieve stored data from sessionStorage on initial load
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
        const img = new Image();
        img.onload = () => {
          setImageSize({ width: img.width, height: img.height });
        };
        img.src = storedImage;
      }
    }
  }, []);

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
    // Clear image state and sessionStorage
    setImage(null);
    setImageSize({ width: 0, height: 0 });
    setFile(null);
    sessionStorage.removeItem('image');
  };

  const handleTitleChange = (e) => {
    // Sanitize and update title state
    const sanitizedTitle = sanitizeHtml(e.target.value, {
      allowedTags: [],
      allowedAttributes: {},
    });

    if (sanitizedTitle.length <= 50) {
      setTitle(sanitizedTitle);
      sessionStorage.setItem('title', sanitizedTitle);
      if (sanitizedTitle.trim() !== '') {
        setTitleError(false);
        setErrorMessage('');
      }
    } else {
      setTitleError(true);
      setErrorMessage('Title should be within 50 characters.');
    }
  };

  const handleTitleBlur = () => {
    setTitleError(false);
    setErrorMessage('');
  };

  const handleContentChange = (e) => {
    // Sanitize and update content state
    const sanitizedContent = sanitizeHtml(e.target.value, {
      allowedTags: [],
      allowedAttributes: {},
    });

    setContent(sanitizedContent);
    sessionStorage.setItem('content', sanitizedContent);
    if (sanitizedContent.trim() !== '') {
      setContentError(false);
      setErrorMessage('');
    }
  };

  const handleContentBlur = () => {
    setContentError(false);
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    try {
      // Validate form fields
      if (!title.trim() || !content.trim()) {
        setTitleError(!title.trim());
        setContentError(!content.trim());
        setErrorMessage('Please enter both title and content.');
        return;
      }

      // Decode token to get userId
      const userId = (jwt.decode(sessionStorage.getItem('token'))).id;
      const postId = sessionStorage.getItem('postId');
      const isUpdate = !!postId;

      let imageUrl = sessionStorage.getItem('image');
      if (file) {
        // Upload image to Firebase Storage if a new file is selected
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Prepare request data
      const requestData = {
        title,
        content,
        imageUrl,
        userId,
      };
      if (isUpdate) {
        requestData.postId = postId;
      }

      // Send POST or PUT request to API endpoint
      const response = await fetch(`/api/blogform/`, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to save post');
      }

      // Clear sessionStorage after submission
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
        <div
          className={`relative w-full border-2 border-dashed border-gray-600 flex items-center justify-center rounded-xl ${
            image ? '' : 'h-48'
          }`}
          style={{
            height: image ? `${Math.min(imageSize.height, 600)}px` : '12rem',
          }}
        >
          {image ? (
            <div className="w-full h-full relative">
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-full object-contain rounded-lg shadow-lg"
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
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageUpload}
              />
              <span className="absolute text-gray-400">
                Drag & drop or click to add an image
              </span>
            </>
          )}
        </div>
        {imageError && (
          <p className="text-red-500 text-sm">{imageError}</p>
        )}

        <div className="w-full mb-4">
          <textarea
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            placeholder="Enter title"
            className={`w-full h-12 border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 text-black ${
              titleError ? 'border-red-500' : ''
            }`}
          />
        </div>

        <div className="w-full">
          <textarea
            value={content}
            onChange={handleContentChange}
            onBlur={handleContentBlur}
            placeholder="Enter text"
            className={`w-full h-40 border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 text-black ${
              contentError ? 'border-red-500' : ''
            }`}
          />
        </div>

        <div className="flex justify-between mt-4">
          <div onClick={() => router.push('/')}>
            <Button text="Back" />
          </div>

          <div className="flex-grow text-center">
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
          </div>

          <div onClick={handleSubmit}>
            <Button text={isUpdate ? 'Update' : 'Post'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogFormPage;
