"use client";

import React from 'react';

const BlogDetail = ({ blog }) => {

  if (!blog || blog.length === 0) {
    return null;
  }
  
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
