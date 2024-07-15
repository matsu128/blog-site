import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Button from '../components/Button';
import Image from 'next/image';
import Footer from '../components/Footer';
import { storage } from '../../firebase';
import { ref, deleteObject } from 'firebase/storage';

const BlogDetailPage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [viewMode, setViewMode] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const router = useRouter();

  // Fetch post data from session storage and set state
  useEffect(() => {
    const imageUrl = sessionStorage.getItem('image');
    const selectedTitle = sessionStorage.getItem('title');
    const selectedContent = sessionStorage.getItem('content');
    const selectedViewMode = sessionStorage.getItem('viewMode');
    const selectedCreatedAt = sessionStorage.getItem('createdAt');

    setImage(imageUrl);
    setTitle(selectedTitle);
    setContent(selectedContent);
    setViewMode(selectedViewMode);
    setCreatedAt(selectedCreatedAt);
  }, []);

  // Navigate to edit page
  const handleEdit = () => {
    router.push('/blogform');
  };

  // Navigate back to home page
  const handleBack = () => {
    router.push('/');
  };

  // Function to delete image from Firebase Storage
  const deleteImageFromFirebase = async () => {
    try {
      // Get image URL from session storage
      const imageUrl = sessionStorage.getItem('image');
      if (!imageUrl) {
        console.error('Image URL not found in session storage');
        return;
      }

      // Set path in Firebase Storage
      const storageRef = ref(storage, imageUrl);
      // Delete the image
      await deleteObject(storageRef);
      // After deleting the image, proceed to delete the post
      handleDelete();
    } catch (error) {
      console.error('Error deleting image from Firebase Storage:', error);
    }
  };

  // Function to delete the post
  const handleDelete = async () => {
    const postId = sessionStorage.getItem('postId');
    if (postId) {
      try {
        const response = await fetch(`/api/blogdetail`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId }),
        });

        if (response.ok) {
          router.push('/');
        } else {
          console.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  // Show delete confirmation dialog
  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    setShowConfirmDialog(false);
    deleteImageFromFirebase(); // Call function to delete image from Firebase Storage
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center py-20 px-6 relative">

        {/* Delete confirmation dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md backdrop-brightness-50">
            <div className="p-10 rounded-2xl shadow-2xl text-center transform transition-all duration-200">
              <p className="text-4xl font-extrabold text-white mb-6 drop-shadow-2xl">
                Do you really want to delete this?
              </p>
              <div className="flex justify-center space-x-4">
                <div onClick={handleConfirmDelete}>
                  <Button text="Delete" />
                </div>
                <div onClick={handleCancelDelete}>
                  <Button text="No" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Display creation date */}
        <div className={`w-full flex justify-end pr-4 mb-4 text-sm ${showConfirmDialog ? 'blur-sm' : ''}`}>
          <p>{new Date(createdAt).toLocaleString()}</p>
        </div>

        <div className={`w-full max-w-screen-xl mx-auto ${showConfirmDialog ? 'blur-sm' : ''}`}>
          {/* Image */}
          <div className="w-full h-96 rounded-lg overflow-hidden relative">
            {image && (
              <Image src={image} alt="Uploaded" layout="fill" objectFit="cover" />
            )}
          </div>

          {/* Title */}
          <div className="flex justify-center mt-6">
            <h1 className="text-2xl font-bold text-center break-words" style={{ width: '80%' }}>
              {title}
            </h1>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center justify-center mt-4">
            <p className="text-base text-center break-words" style={{ width: '80%' }}>
              {content}
            </p>
          </div>

          {/* Button area */}
          <div className={`flex justify-center mt-6 ${viewMode === 'myself' ? 'space-x-10' : ''}`}>
            <div onClick={handleBack}>
              <Button text="Back" />
            </div>

            {viewMode === 'myself' && (
              <>
                <div onClick={handleEdit}>
                  <Button text="Edit" />
                </div>
                <div onClick={handleDeleteClick}>
                  <Button text="Delete" />
                </div>
              </>
            )}
          </div>
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default BlogDetailPage;
