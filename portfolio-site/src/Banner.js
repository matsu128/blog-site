import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner" id="banner">
      <h1>Welcome to My Portfolio</h1>
      <p>Hello, I'm John Doe. I'm a Web Developer.</p>
      <div className="career">
        <h2>未経験からバックエンドエンジニアとしての現在に至るまでの軌跡</h2>
        <p>使用した言語etc...</p>
      </div>
    </div>
  );
};

export default Banner;
