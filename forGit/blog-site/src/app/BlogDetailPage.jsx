"use client";

import React from 'react';
import BlogDetail from './components/BlogDetail';
import Button from './components/Button';

const BlogDetailPage = ({ blog }) => {
  return (
    <div>
      <BlogDetail blog={blog} />
      <Button href="/">Back</Button>
      <Button href="/create">Edit</Button>
      <Button>Delete</Button>
    </div>
  );
};

export default BlogDetailPage;
