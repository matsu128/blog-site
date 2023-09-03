import React from 'react';
import './Project2.css'; // Project1コンポーネントのスタイルを定義したCSSファイルをインポート
import { Link } from 'react-router-dom'; // Linkコンポーネントをインポート


const Project2 = () => {
    const mainPage = [
        {
            title: 'Mainpage',
            description: 'If you want to back',
            link: '/', // Mainpageに遷移
        },
    ];
    
  return (
    <div className="project1-container">
      <div className="project1-header">
        <h2>Project 2</h2>
        <p>Duration: January 2022 - March 2022</p>
        <p>Language: JavaScript, HTML, CSS</p>
        <p>Role: Frontend Developer</p>
      </div>
      <div className="project1-details">
        <h3>Project Details</h3>
        <p>
          This was a web development project to create a responsive website for a client in the
          healthcare industry. I joined the project during the initial development phase and was
          responsible for implementing the frontend user interface using JavaScript, HTML, and CSS.
          The website was designed to be mobile-friendly and accessible, providing information about
          the client's services and contact information.
        </p>
      </div>
      <div id="mainpage">
        {mainPage.map((mainpage, inedx) => (
            <div className="back">
                <Link className="project-link" to={mainpage.link}>
                    戻る
                </Link>
            </div>
        ))}
      </div>

    </div>
  );
};

export default Project2;
