// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/bloglist'); // 成功した場合にBlogListPageにリダイレクト
    } else {
      const data = await res.json();
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
