import React from 'react';
import ArticleItem from './ArticleItem';
import Pagination from './Pagination';
import Button from '../components/Button';

const BlogList = ({ articles, currentPage, totalPages, onPageChange, onSelectArticle, onNewPost, userId }) => {
  return (
    <div>
      <div className="pt-20">
        <ArticleItem articles={articles} onSelect={onSelectArticle} />
      </div>
      <div className="mt-10 pb-10 flex flex-col md:flex-row justify-between items-center">
  <div className="w-full md:w-7/12 mb-4 md:mb-0 md:flex md:justify-end">
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
  </div>
  {userId && (
    <div onClick={onNewPost} className="md:w-3/12 mx-auto md:ml-auto md:pr-10 md:w-40 sm:mx-5">
      <Button text="New Post" />
    </div>
  )}
</div>

    </div>
  );
};

export default BlogList;
