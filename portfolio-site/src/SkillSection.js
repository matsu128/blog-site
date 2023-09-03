import React, { useState, useEffect } from 'react';
import './SkillSection.css'; // SkillSectionコンポーネントのスタイルを定義したCSSファイルをインポート

const SkillSection = () => {
  const skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    // 他のスキルを追加
  ];

  const [showSkillSection, setShowSkillSection] = useState(false);

  // スクロールイベントを監視
  useEffect(() => {
    const handleScroll = () => {
      // スクロール位置がSkillセクションの位置に近づいたら表示する
      const skillSection = document.getElementById('skills');
      if (skillSection) {
        const skillSectionTop = skillSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (skillSectionTop < windowHeight * 0.8) {
          setShowSkillSection(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // クリーンアップ
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`skill-section ${showSkillSection ? 'show' : ''}`} id="skills">
      {/* ぼかしをかける背景画像 */}
      <div className="skill-background"></div>
      <h2>Skills</h2>
      <ul className="skill-list">
        {skills.map((skill, index) => (
          <li key={index} className="skill-item">{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillSection;
