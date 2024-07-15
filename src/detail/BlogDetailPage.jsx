import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { storage } from '../../firebase';
import { ref, deleteObject } from 'firebase/storage';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import PostImage from './PostImage';
import PostContent from './PostContent';
import ActionButtons from './ActionButtons';

const BlogDetailPage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [viewMode, setViewMode] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const router = useRouter();

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

  const handleEdit = () => {
    router.push('/blogform');
  };

  const handleBack = () => {
    router.push('/');
  };

  const deleteImageFromFirebase = async () => {
    try {
      const imageUrl = sessionStorage.getItem('image');
      if (!imageUrl) {
        console.error('Image URL not found in session storage');
        return;
      }

      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      handleDelete();
    } catch (error) {
      console.error('Error deleting image from Firebase Storage:', error);
    }
  };

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

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmDialog(false);
    deleteImageFromFirebase();
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center py-20 px-6 relative">
        {showConfirmDialog && (
          <DeleteConfirmationDialog
            onConfirmDelete={handleConfirmDelete}
            onCancelDelete={handleCancelDelete}
          />
        )}
        <div className={`w-full flex justify-end pr-4 mb-4 text-sm ${showConfirmDialog ? 'blur-sm' : ''}`}>
          <p>{new Date(createdAt).toLocaleString()}</p>
        </div>
        <div className={`w-full max-w-screen-xl mx-auto ${showConfirmDialog ? 'blur-sm' : ''}`}>
          <PostImage image={image} />
          <PostContent title={title} content={content} />
          <ActionButtons
            viewMode={viewMode}
            onBack={handleBack}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetailPage;
