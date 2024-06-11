"use client";

import React, { useState } from 'react';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import Button from './Button';
import Link from './Link';

const SignInForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/SignInForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password, email }),
      });

      if (response.ok) {
        console.log('User signed in successfully!');
      } else {
        console.error('Failed to sign in.');
      }
    } catch (error) {
      console.error('Error while signing in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Button type="submit">Sign In</Button>
      {/*
      <Link href="/forgot-password">Forgot Password?</Link>
      */}
    </form>
  );
};

export default SignInForm;
