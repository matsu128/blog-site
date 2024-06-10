import React from 'react';
import Banner from './Banner';
import ProjectList from './ProjectList';
import SkillSection from './SkillSection';
import ContactForm from './ContactForm';

const MainPage = () => {
  return (
    <div>
      <Banner />
      <ProjectList />
      <SkillSection />
      <ContactForm />
    </div>
  );
};

export default MainPage;
