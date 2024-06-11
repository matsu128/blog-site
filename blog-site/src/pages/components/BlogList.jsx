"use client";

import React from 'react';
import BlogListItem from './BlogListItem';{/*
import Button from './Button';
*/}

const BlogList = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return null; // もしくは空の要素を返すなど
  }

  return (
    <div>
      {blogs.map((blog) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}

      <Button>Add New Blog</Button>
    </div>
  );
};


export default BlogList;
