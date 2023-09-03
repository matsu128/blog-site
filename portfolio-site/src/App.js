// import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import MainPage from './MainPage';
import ContactSuccess from './ContactSuccess';
import Project1 from './Project1';
import Project2 from './Project2';
//import LoginForm from './LoginForm';

const App = () => {

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* メインページ */}
          <Route path="/" element={<MainPage />} />

          {/* コンタクトフォームを送信した後の成功ページ */}
          <Route path="/contact-success" element={<ContactSuccess />} />
          <Route path="/project1/" element={<Project1 />} />
          <Route path="/project2/" element={<Project2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
