import React from 'react';
import './ProjectList.css';
import { Link } from 'react-router-dom'; // Linkコンポーネントをインポート

const ProjectList = () => {
  const projects = [
    {
      title: 'Project 1',
      description: 'This is my first project. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      link: '/project1', // /project1にリンクする
    },
    {
      title: 'Project 2',
      description: 'This is my second project. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      link: '/project2', // project2に遷移する
    },
    // 他のプロジェクトを追加
  ];

  return (
    <div className="project-list" id="projects">
      <h2>Projects</h2>
      {projects.map((project, index) => (
        <div className="project-item" key={index}>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          {/* Learn Moreのリンクを作成 */}
          <Link className="project-link" to={project.link}>
            Learn More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
