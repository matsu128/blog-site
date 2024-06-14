'use client';

import React, { useState } from 'react';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import Button from './Button';
import Link from './Link';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/LoginForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        console.log('User logged in successfully!');
        const data = await response.json();
        setMessage(`User data saved successfully! Welcome, ${data.name}`);
      } else {
        console.error('Failed to log in.');
      }
    } catch (error) {
      console.error('Error while logging in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Name'
      />
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <Button type='submit'>Login</Button>
      {/*
      <Link to="/forgot-password">Forgot Password?</Link>
      */}
      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginForm;
