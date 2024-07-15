import BlogListPage from '../src/list/BlogListPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <title>Share Your Best Moments | BlogSite</title>
      <BlogListPage />
      <Footer />
    </>
  );
}
