import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3);
      } else if (currentPage >= totalPages - 1) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-1 mx-1 bg-white text-gray-700 border border-gray-300 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        Back
      </button>
      {currentPage > 2 && totalPages > 3 && (
        <span className="px-2 py-1 mx-1 text-gray-700">...</span>
      )}
      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-1 mx-1 rounded-full border border-gray-300 ${currentPage === page ? 'bg-gray-300 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'} focus:outline-none`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages - 1 && totalPages > 3 && (
        <span className="px-2 py-1 mx-1 text-gray-700">...</span>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-1 mx-1 bg-white text-gray-700 border border-gray-300 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
