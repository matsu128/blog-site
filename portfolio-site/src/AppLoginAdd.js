import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import MainPage from './MainPage';
import ContactSuccess from './ContactSuccess';
import Project1 from './Project1';
import LoginForm from './LoginForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    // ログイン処理を実装する（バックエンドのAPIと連携）
    // 例: サーバーにユーザーが入力したemailとpasswordを送信し、ログイン結果を受け取る

    // 仮のログイン処理
    if (email.trim() !== '' && password.trim() !== '') {
      setIsLoggedIn(true);
      window.location.href = '/main'; // ログイン成功時にMainPageにリダイレクト
    } else {
      alert('ログイン失敗。正しいメールアドレスとパスワードを入力してください。');
    }
    
  };

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* ログイン画面 */}
          <Route
            path="/"
            element={
              <LoginForm
                isLoggedIn={isLoggedIn}
                handleLogin={handleLogin}
              />
            }
          />
          {/* ログイン後のメインページ */}
          <Route path="/main" element={<MainPage />} />

          {/* コンタクトフォームを送信した後の成功ページ */}
          <Route path="/contact-success" element={<ContactSuccess />} />
          <Route path="/project1/*" element={<Project1 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
