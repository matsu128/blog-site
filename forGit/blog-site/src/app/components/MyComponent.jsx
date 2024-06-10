"use client";

import React, { useState } from 'react';

const MyComponent = () => {
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/submitName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="名前を入力してください" 
        />
        <button type="submit">送信</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default MyComponent;
