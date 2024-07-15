import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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

    // 入力のサニタイズ
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
        // トークンをsessionStorageに保存
        sessionStorage.setItem('token', result.token);

        // 次の画面に遷移
        router.push('/');
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
              alt='Description of image'
              width={200}
              height={200}
            />
          </div>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Login in to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
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
                  className='block w-full p-1.5 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 placeholder:italic placeholder:text-slate-400'
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
