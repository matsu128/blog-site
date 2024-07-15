import React from 'react';
import sanitizeHtml from 'sanitize-html';

const ContentInput = ({ content, setContent, contentError, setContentError, setErrorMessage }) => {
  const handleContentChange = (e) => {
    const sanitizedContent = sanitizeHtml(e.target.value, {
      allowedTags: [],
      allowedAttributes: {},
    });

    setContent(sanitizedContent);
    sessionStorage.setItem('content', sanitizedContent);
    if (sanitizedContent.trim() !== '') {
      setContentError(false);
      setErrorMessage('');
    }
  };

  const handleContentBlur = () => {
    setContentError(false);
    setErrorMessage('');
  };

  return (
    <textarea
      value={content}
      onChange={handleContentChange}
      onBlur={handleContentBlur}
      placeholder="Enter text"
      className={`w-full h-40 border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 text-black ${contentError ? 'border-red-500' : ''}`}
    />
  );
};

export default ContentInput;
