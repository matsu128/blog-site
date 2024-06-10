import React from 'react';
import SignInForm from './components/SignInForm';
import Link from './components/Link';

const SignInPage = () => {
  return (
    <div>
      <SignInForm />
      <Link href="/">Sign Up</Link>
    </div>
  );
};

export default SignInPage;
