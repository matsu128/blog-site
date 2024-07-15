import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { storage } from '../../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import BlogList from './BlogList';
import ViewModeSelector from './ViewModeSelector';

const ArticleContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [viewMode, setViewMode] = useState('everyone');
  const articlesPerPage = 6;
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  const fetchArticles = async (requestData) => {
    try {
      const response = await fetch('/api/bloglist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.posts) {
        const postsWithImageURLs = await Promise.all(
          data.posts.map(async (post) => {
            if (post.imageUrl) {
              const imageUrl = await getFirebaseImageURL(post.imageUrl);
              return { ...post, imageUrl };
            }
            return post;
          })
        );
        setArticles(postsWithImageURLs);
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setArticles([]);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    if (decodedToken) {
      setUserId(decodedToken.id);
    }

    fetchArticles({ viewMode });
  }, []);

  useEffect(() => {
    fetchArticles({ viewMode, userId, currentPage });
  }, [viewMode, currentPage, userId]);

  const getFirebaseImageURL = async (imagePath) => {
    try {
      const storageRef = ref(storage, imagePath);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error getting download URL:', error);
      return null;
    }
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  const handleArticleSelect = (article) => {
    sessionStorage.setItem('postId', article.id);
    sessionStorage.setItem('title', article.title);
    sessionStorage.setItem('content', article.content);
    sessionStorage.setItem('image', article.imageUrl || '');
    sessionStorage.setItem('createdAt', article.createdAt);
    sessionStorage.setItem('viewMode', viewMode);
    router.push('/blogdetail');
  };

  const handleNewPost = () => {
    sessionStorage.removeItem('title');
    sessionStorage.removeItem('content');
    sessionStorage.removeItem('image');
    sessionStorage.removeItem('postId');
    router.push('/blogform');
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = Array.isArray(articles) ? articles.slice(indexOfFirstArticle, indexOfLastArticle) : [];
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <div className="bg-gray-100 md:bg-white min-h-screen relative">
      <ViewModeSelector viewMode={viewMode} onViewModeChange={handleViewModeChange} userId={userId} />
      <BlogList
        articles={currentArticles}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onSelectArticle={handleArticleSelect}
        onNewPost={handleNewPost}
        userId={userId}
      />
    </div>
  );
};

export default ArticleContainer;
