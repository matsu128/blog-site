import BlogListPage from '../src/list/BlogListPage';
import { getStaticPaths } from 'next';


export default function Home() {
  return (
    <>
      <div>
        <BlogListPage />
      </div>
    </>
  );
}
