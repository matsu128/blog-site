import React from 'react';

const Footer = () => {
  return (
    <footer className='text-gray-700 py-4 px-4 text-center'>
      <div className='flex justify-center items-center space-x-4'>
        <a
          href='https://github.com/matsu128'
          target='_blank'
          rel='noopener noreferrer'>
          <svg
            className='h-6 w-6 fill-current text-gray-600 hover:text-gray-900'
            viewBox='0 0 24 24'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12 1.5C6.201 1.5 1.5 6.201 1.5 12c0 4.558 2.96 8.419 7.07 9.768.516.094.705-.225.705-.5v-1.753c-2.873.625-3.48-1.385-3.48-1.385-.47-1.185-1.15-1.502-1.15-1.502-.942-.64.071-.627.071-.627 1.042.074 1.592 1.072 1.592 1.072.928 1.59 2.433 1.132 3.025.865.093-.673.361-1.132.656-1.392-2.293-.262-4.698-1.146-4.698-5.103 0-1.125.396-2.043 1.048-2.759-.105-.263-.454-1.309.1-2.726 0 0 .864-.276 2.83 1.055a9.682 9.682 0 012.513-.342c.853.002 1.713.115 2.513.342 1.965-1.33 2.828-1.055 2.828-1.055.556 1.417.208 2.463.103 2.726.653.716 1.047 1.634 1.047 2.759 0 3.968-2.408 4.838-4.707 5.094.37.317.702.943.702 1.902v2.83c0 .277.189.598.707.5 4.107-1.349 7.064-5.21 7.064-9.768 0-5.799-4.701-10.5-10.5-10.5z'
            />
          </svg>
        </a>
        <a
          href='https://www.linkedin.com/in/sou-m-868661276'
          target='_blank'
          rel='noopener noreferrer'>
          <svg
            className='h-6 w-6 fill-current text-gray-600 hover:text-gray-900'
            viewBox='0 0 24 24'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M20 2H4C2.897 2 2 2.897 2 4v16c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM8 18H5V10h3v8zm-.5-9.5c-1.378 0-2.5-1.122-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.122 2.5 2.5-1.122 2.5-2.5 2.5zm10 9.5h-3V13c0-1.381-1.119-2.5-2.5-2.5s-2.5 1.119-2.5 2.5v5H8V10h2v.968c.352-.566.98-.968 1.693-.968 1.379 0 2.5 1.122 2.5 2.5v5h2v-5c0-2.481-2-4.5-4.5-4.5s-4.5 2.019-4.5 4.5v5H5V10h2v.968c.352-.566.98-.968 1.693-.968 1.379 0 2.5 1.122 2.5 2.5v5h2v-5c0-2.481-2-4.5-4.5-4.5s-4.5 2.019-4.5 4.5v5H5V10h14v8z'
            />
          </svg>
        </a>
      </div>
      © 2024 Matsumoto Sou. All rights reserved.
    </footer>
  );
};

export default Footer;
