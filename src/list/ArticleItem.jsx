import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ArticleItem = ({ articles, onSelect }) => {
  const router = useRouter();

  const handleArticleClick = (article) => {
    onSelect(article);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    } else {
      return text;
    }
  };

  return (
    <section id="skills" className="pt-20">
      <div className="container mx-auto px-4 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col w-full h-full mb-8 p-6 border-2 border-gray-300 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
              onClick={() => handleArticleClick(article)}
            >
              <div className="w-full h-64 relative mb-4">
                {article.imageUrl && (
                  <Image
                    src={article.imageUrl}
                    alt="Article Image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg transform transition duration-500 hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-40 transition duration-500 rounded-lg"></div>
              </div>
              <div className="flex flex-col flex-grow items-center text-center">
                <h1 className="text-2xl font-medium text-gray-900 mb-2">
                  {truncateText(article.title, 10)}
                </h1>
                <p>{article.text}</p>
                <p className="text-gray-500 text-sm mt-2">{new Date(article.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleItem;
