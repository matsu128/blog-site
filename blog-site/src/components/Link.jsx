"use client";

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ to, children }) => {
  return (
    <RouterLink to={to}>
      {children}
    </RouterLink>
  );
};

export default Link;
