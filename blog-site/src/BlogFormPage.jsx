"use client";

import React from 'react';
import BlogForm from './components/BlogForm';
import Button from './components/Button';

const BlogFormPage = () => {
  return (
    <div>
      <BlogForm />
      <Button href="/">Cancel</Button>
      <Button>Delete</Button>
    </div>
  );
};

export default BlogFormPage;
