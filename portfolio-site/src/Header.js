import React from 'react';
import './Header.css'; // Headerコンポーネントのスタイルを定義したCSSファイルをインポート

const Header = () => {
  return (
    <header className="header fixed" id="header">
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="navbar-logo">Logo</span>
          <span className="navbar-title">My Portfolio</span>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="#banner">About</a>
          </li>
          <li className="navbar-item">
            <a href="#projects">Projects</a>
          </li>
          <li className="navbar-item">
            <a href="#skills">Skills</a>
          </li>
          <li className="navbar-item">
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
