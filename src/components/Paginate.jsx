import React from "react";

const Pagination = ({ currentPage, totalPage, onPageChange }) => {
  const Button = ({ children, className, ...props }) => (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg font-semibold transition-all ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex justify-center items-center mt-4 gap-2">
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`bg-gray-300 text-gray-800 hover:bg-gray-400 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        ◀ Prev
      </Button>

      <span className="font-semibold text-gray-700">
        Page {currentPage} of {totalPage}
      </span>

      <Button
        disabled={currentPage === totalPage || totalPage === 0}
        onClick={() => onPageChange(currentPage + 1)}
        className={`bg-gray-300 text-gray-800 hover:bg-gray-400 ${
          currentPage === totalPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next ▶
      </Button>
    </div>
  );
};

export default Pagination;
