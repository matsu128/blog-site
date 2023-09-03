import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactForm.css'; // SkillSectionコンポーネントのスタイルを定義したCSSファイルをインポート


const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // フォームの送信処理
    // ここでフォームの内容をサーバーに送信する処理を追加する
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    // 送信後にフォームをリセットする
    setName('');
    setEmail('');
    setMessage('');

    // 送信完了ページにリダイレクト
    navigate('/contact-success');
  };

  return (
    <div className="contact-form" id="contact">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactForm;
