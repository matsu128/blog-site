import React from 'react';

const PostContent = ({ title, content }) => (
  <div>
    <div className="flex justify-center mt-6">
      <h1 className="text-2xl font-bold text-center break-words" style={{ width: '80%' }}>
        {title}
      </h1>
    </div>
    <div className="flex flex-col items-center justify-center mt-4">
      <p className="text-base text-center break-words" style={{ width: '80%' }}>
        {content}
      </p>
    </div>
  </div>
);

export default PostContent;
