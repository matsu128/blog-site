import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <header className="bg-white text-black shadow-md fixed w-full top-0 z-50">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Left side - responsive menu or buttons */}
          <div className="flex items-center space-x-4">
            {/* Hamburger menu for mobile */}
            <button
              className="block lg:hidden text-black focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className={`h-6 w-6 fill-current ${menuOpen ? 'rotate-90' : ''}`}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              </svg>
            </button>
            {/* Buttons for larger screens */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                className="text-black hover:text-gray-800 focus:outline-none transition-colors duration-300"
                onClick={handleLogin}
              >
                Login or Signin
              </button>
            </div>
          </div>
          {/* Right side - favicon and site name */}
          <div className="flex items-center ml-auto space-x-2">
            <img
              src="/favicon.ico"
              alt="favicon"
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-bold">blog-site</span>
          </div>
        </div>
      </div>
      {/* Responsive menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white py-2 px-4 space-y-2 absolute w-full top-20">
          <button
            className="block text-black hover:text-gray-800 focus:outline-none transition-colors duration-300"
            onClick={handleLogin}
          >
            Login or Signin
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
