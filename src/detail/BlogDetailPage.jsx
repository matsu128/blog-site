import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Button from '../components/Button';
import Image from 'next/image';
import Footer from '../components/Footer';
import { storage } from '../../firebase'; // Firebase の設定から storage をインポート
import { ref, deleteObject } from 'firebase/storage';

const BlogDetailPage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [viewMode, setViewMode] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const router = useRouter();

  // セッションストレージから投稿データを取得し、ステートに設定
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

  // 編集ページへの遷移
  const handleEdit = () => {
    router.push('/blogform');
  };

  // ホームページへの遷移
  const handleBack = () => {
    router.push('/');
  };

  // Firebase Storageから画像を削除する関数
  const deleteImageFromFirebase = async () => {
    try {
      // セッションストレージから画像のURLを取得
      const imageUrl = sessionStorage.getItem('image');
      if (!imageUrl) {
        console.error('Image URL not found in session storage');
        return;
      }

      // Firebase Storage内のパスを設定
      const storageRef = ref(storage, imageUrl);
      // 画像を削除
      await deleteObject(storageRef);
      // 画像の削除後、投稿を削除
      handleDelete();
    } catch (error) {
      console.error('Error deleting image from Firebase Storage:', error);
    }
  };

  // 投稿の削除
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

  // 削除確認ダイアログの表示
  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  // 削除の確認
  const handleConfirmDelete = () => {
    setShowConfirmDialog(false);
    deleteImageFromFirebase(); // Firebase Storageから画像を削除する関数を呼び出す
  };

  // 削除のキャンセル
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center py-20 px-6 relative">

        {/* 削除確認ダイアログ */}
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

        {/* 投稿日時表示エリア */}
        <div className={`w-full flex justify-end pr-4 mb-4 text-sm ${showConfirmDialog ? 'blur-sm' : ''}`}>
          <p>{new Date(createdAt).toLocaleString()}</p>
        </div>

        <div className={`w-full max-w-screen-xl mx-auto ${showConfirmDialog ? 'blur-sm' : ''}`}>
          {/* 画像 */}
          <div className="w-full h-96 rounded-lg overflow-hidden relative">
            {image && (
              <Image src={image} alt="Uploaded" layout="fill" objectFit="cover" />
            )}
          </div>

          {/* タイトル */}
          <div className="flex justify-center mt-6">
            <h1 className="text-2xl font-bold text-center break-words" style={{ width: '80%' }}>
              {title}
            </h1>
          </div>

          {/* コンテンツ */}
          <div className="flex flex-col items-center justify-center mt-4">
            <p className="text-base text-center break-words" style={{ width: '80%' }}>
              {content}
            </p>
          </div>

          {/* ボタンエリア */}
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
