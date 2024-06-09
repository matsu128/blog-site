"use client";

import React, { useState } from 'react';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/LoginPage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setMessage(data.message);

        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        }
      } else {
        console.error('Failed to log in.');
        setMessage('Failed to log in.');
      }
    } catch (error) {
      console.error('Error while logging in:', error);
      setMessage('Error while logging in.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
