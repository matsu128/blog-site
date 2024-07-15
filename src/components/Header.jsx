import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogin = () => {
    router.push('/');
  };

  const handleContact = () => {
    router.push('/contact');
  };

  return (
    <header className='bg-white text-black shadow-md fixed w-full top-0 z-50'>
      <div className='mx-auto px-4'>
        <div className='flex justify-between items-center h-20'>
          {/* Left side - favicon and site name */}
          <div className='flex items-center mr-auto space-x-2'>
            <img
              onClick={handleLogin}
              src='/favicon.ico'
              alt='favicon'
              className='w-14 h-14 object-contain cursor-pointer'
            />
          </div>
          <div>
            <img
              class='w-8 h-8 rounded-full mx-auto'
              src='/avatar.webp'
              alt=''></img>
          </div>

          {/* Left side - responsive menu or buttons */}
          <div className='flex items-center space-x-4'>
            {/* Hamburger menu for mobile */}
            <button
              className='block lg:hidden text-black focus:outline-none'
              onClick={toggleMenu}>
              <svg
                className={`h-6 w-6 fill-current ${
                  menuOpen ? 'rotate-90' : ''
                }`}
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M4 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
                />
              </svg>
            </button>
            {/* Buttons for larger screens */}
            <div className='hidden lg:flex items-center space-x-4'></div>
          </div>
        </div>
      </div>
      {/* Responsive menu */}
      {menuOpen && (
        <div className='lg:hidden bg-white py-2 px-4 space-y-2 absolute w-full top-20'>
          <button
            className='block text-black hover:text-gray-800 focus:outline-none transition-colors duration-300'
            onClick={handleLogin}>
            Login or Signin
          </button>
          <button
            className='block text-black hover:text-gray-800 focus:outline-none transition-colors duration-300'
            onClick={handleContact}>
            Contact Me
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
