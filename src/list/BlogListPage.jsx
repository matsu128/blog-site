import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleContainer from './ArticleContainer';

const BlogListPage = () => {
  return (
    <div className="bg-gray-100 md:bg-white min-h-screen relative">
      <Header />
      <ArticleContainer />
      <Footer />
    </div>
  );
};

export default BlogListPage;
