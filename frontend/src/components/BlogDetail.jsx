import React from 'react';
import Button from './Button';

const BlogDetail = ({ blog }) => {

  if (!blog || blog.length === 0) {
    return null;
  }
  
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <Button>Back</Button>
      <Button>Edit</Button>
      <Button>Delete</Button>
    </div>
  );
};

export default BlogDetail;
