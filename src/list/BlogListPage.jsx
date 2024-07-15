import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import ArticleItem from './ArticleItem';
import Pagination from './Pagination';
import Button from '../components/Button';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Footer from '../components/Footer';
import jwt from 'jsonwebtoken';
import { storage } from '../../firebase'; // Import storage from Firebase configuration
import { ref, getDownloadURL } from 'firebase/storage';

const BlogListPage = () => {
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
        // Get download URLs for images and set article data
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
      const downloadURL = await getDownloadURL(storageRef); // Use correct method

      return downloadURL;
    } catch (error) {
      console.error('Error getting download URL:', error);
      return null;
    }
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = Array.isArray(articles) ? articles.slice(indexOfFirstArticle, indexOfLastArticle) : [];

  const totalPages = Math.ceil(articles.length / articlesPerPage);

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

  return (
    <div className="bg-gray-100 md:bg-white min-h-screen relative">
      <Header />
      <div className="absolute top-20 left-0 right-0 z-10 flex justify-end space-x-4 px-4">
        <PeopleAltIcon className="text-green-600 self-center" />
        <button
          className={`bg-transparent text-green-800 border border-white py-2 px-4 rounded-full hover:bg-white hover:text-black transition duration-300 relative overflow-hidden ${viewMode === 'everyone' ? 'font-bold' : ''}`}
          onClick={() => handleViewModeChange('everyone')}
        >
          <span className="relative z-10">everyone</span>
        </button>
        {userId && (
          <>
            <PersonIcon className="text-orange-400 self-center" />
            <button
              className={`bg-transparent text-orange-700 border border-white py-2 px-4 rounded-full hover:bg-white hover:text-black transition duration-300 relative overflow-hidden ${viewMode === 'myself' ? 'font-bold' : ''}`}
              onClick={() => handleViewModeChange('myself')}
            >
              <span className="relative z-10">myself</span>
            </button>
          </>
        )}
      </div>
      
      <div className="pt-20">
        <ArticleItem articles={currentArticles} onSelect={handleArticleSelect} />
      </div>

      <div className="mt-10 pb-10 flex justify-between items-center">
        <div className="w-full md:w-7/12 flex justify-end">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
        {userId && (
          <div onClick={handleNewPost} className="w-full md:w-3/12 ml-auto pr-10 md:w-40">
            <Button text="New Post" />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogListPage;
