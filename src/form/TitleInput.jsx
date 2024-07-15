import React from 'react';
import sanitizeHtml from 'sanitize-html';

const TitleInput = ({ title, setTitle, titleError, setTitleError, setErrorMessage }) => {
  const handleTitleChange = (e) => {
    const sanitizedTitle = sanitizeHtml(e.target.value, {
      allowedTags: [],
      allowedAttributes: {},
    });

    if (sanitizedTitle.length <= 50) {
      setTitle(sanitizedTitle);
      sessionStorage.setItem('title', sanitizedTitle);
      if (sanitizedTitle.trim() !== '') {
        setTitleError(false);
        setErrorMessage('');
      }
    } else {
      setTitleError(true);
      setErrorMessage('Title should be within 50 characters.');
    }
  };

  const handleTitleBlur = () => {
    setTitleError(false);
    setErrorMessage('');
  };

  return (
    <textarea
      value={title}
      onChange={handleTitleChange}
      onBlur={handleTitleBlur}
      placeholder="Enter title"
      className={`w-full h-12 border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 text-black ${titleError ? 'border-red-500' : ''}`}
    />
  );
};

export default TitleInput;
