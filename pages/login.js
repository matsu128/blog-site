import { useEffect } from 'react';
import LoginPage from '../src/login/LoginPage';
import Footer from '@/components/Footer';

const Login = () => {
  useEffect(() => {
    // Add the overflow-hidden class to the body
    document.body.classList.add('overflow-hidden');

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <>
      <title>Login | BlogSite</title>
      <LoginPage />
      <Footer />
    </>
  );
};

export default Login;
