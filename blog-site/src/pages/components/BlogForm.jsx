"use client";

import React, { useState } from 'react';
import TextInput from './TextInput';
import TextArea from './TextArea';
import ImageUploader from './ImageUploader';
import Button from './Button';

const BlogForm = ({ blog, onSave }) => {
  const [title, setTitle] = useState(blog ? blog.title : '');
  const [content, setContent] = useState(blog ? blog.content : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <TextArea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
      <ImageUploader />
      <Button type="submit">Save</Button>
      {blog && <Button>Delete</Button>}
    </form>
  );
};

export default BlogForm;
