import React from 'react';
import BlogList from '../components/BlogList';
import Button from '../components/Button';

const BlogListPage = ({ blogs }) => {
  return (
    <div>
      <BlogList blogs={blogs} />
      <Button href="/create">Add New Blog</Button>
    </div>
  );
};

export default BlogListPage;
