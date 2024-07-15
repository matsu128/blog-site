import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from '@/components/Button';
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    // Sanitize inputs
    const sanitizedEmail = email.trim();
    const sanitizedPassword = password.trim();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: sanitizedEmail, password: sanitizedPassword }),
      });

      if (response.ok) {
        const result = await response.json();
        // Save token in sessionStorage
        sessionStorage.setItem('token', result.token);

        // Navigate to the next screen
        router.push('/');
      } else if (response.status === 401) {
        setError('Email address or password is incorrect.');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  const joinBloggerHandler = () => {
    router.push('/signup');
  };

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className='flex justify-center'>
            <Image
              src='/logo.jpg'
              alt='Logo'
              width={200}
              height={200}
            />
          </div>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Login to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          {/* Error banner */}
          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
              <strong className='font-bold'>Error!</strong>
              <span className='block sm:inline'> {error}</span>
            </div>
          )}

          <form onSubmit={loginSubmitHandler}>
            <div className='mb-3'>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='block w-full p-1.5 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 placeholder:italic placeholder:text-gray-400'
                  placeholder='myblog@example.com'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-orange-600 hover:text-orange-500'>
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='password'
                  required
                  className='block w-full p-1.5 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 placeholder:italic'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button text={'Login'} />
          </form>

          <button className='w-full mt-2 rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 relative'>
            <GoogleIcon className='absolute left-3' />
            Login with Google
          </button>

          <p className='mt-10 text-center text-sm text-black'>
            Not a member?{' '}
            <button
              onClick={joinBloggerHandler}
              className='font-semibold leading-6 text-orange-600 hover:text-orange-500'>
              Join our blogger
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
