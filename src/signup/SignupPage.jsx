import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SigninPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null); // State to hold error messages
  const [message, setMessage] = useState(''); // State to hold success message

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Set specific error message for 400 status
        if (response.status === 400) {
          setError('User already exists with this email.');
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setMessage(''); // Clear previous success message
      } else {
        setMessage(data.message); // Set success message to state
        setError(null); // Clear previous error
        router.push('/login'); // Redirect to login page
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Failed to sign up. Please try again.'); // Set general error message to state
      setMessage(''); // Clear previous success message
    }
  };

  return (
    <>
      <Header />
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='object-contain h-48 w-96'
            src='/logo.jpg'
            alt='Your Company'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign up for an account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          {/* Display error message */}
          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
              <strong className='font-bold'>Error!</strong>
              <span className='block sm:inline'> {error}</span>
            </div>
          )}

          {/* Display success message */}
          {message && (
            <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative' role='alert'>
              <strong className='font-bold'>Success!</strong>
              <span className='block sm:inline'> {message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-900'>
                Name
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className='block w-full p-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 placeholder:italic placeholder:text-gray-400'
                  placeholder='Your name'
                />
              </div>
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                Email
              </label>
              <div className='mt-2'>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='block w-full p-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 placeholder:italic placeholder:text-gray-400'
                  placeholder='myblog@example.com'
                />
              </div>
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                Password
              </label>
              <div className='mt-2'>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='block w-full p-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 placeholder:italic placeholder:text-gray-400'
                  placeholder='Your password'
                />
              </div>
            </div>
            <div className='mt-4'>
              <button
                type='submit'
                className='w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SigninPage;
