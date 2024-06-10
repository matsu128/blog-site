"use client";

import React from 'react';
import RadioButton from './RadioButton';
import Checkbox from './Checkbox';

const BlogListItem = ({ blog }) => {
  return (
    <div>
      <h3>{blog.title}</h3>
      <RadioButton>Edit</RadioButton>
      <Checkbox>Delete</Checkbox>
    </div>
  );
};

export default BlogListItem;
