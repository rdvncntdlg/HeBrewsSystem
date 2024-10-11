import React, { useState } from 'react';

function StocksTable({ stockItems }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;  // Set to 10 items per page

  // Calculate total pages
  const totalPages = Math.ceil(stockItems.length / itemsPerPage);

  // Get the current stock items for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stockItems.slice(indexOfFirstItem, indexOfLastItem);

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-5">
      <div className="grid grid-cols-4 gap-4 px-8 py-4 w-full text-sm font-bold text-white bg-neutral-950 rounded-3xl max-md:px-4">
        <div className="text-left">ITEM ID</div>
        <div className="text-left">NAME</div>
        <div className="text-left">QUANTITY</div>
        <div className="text-left">SUPPLIER</div>
      </div>

      {currentItems.length > 0 ? (
        currentItems.map((item, index) => (
          <div
            key={item.id}
            className={`grid grid-cols-4 gap-4 items-center py-2 px-8 text-xs ${index % 2 === 0 ? 'bg-zinc-300' : 'bg-white'} max-md:px-4`}
          >
            <div>{item.id}</div>
            <div>{item.name}</div>
            <div>{item.quantity}</div>
            <div>{item.supplier}</div>
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-gray-500">No stock items available</div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          className={`px-4 py-2 bg-gray-700 text-white rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          className={`px-4 py-2 bg-gray-700 text-white rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StocksTable;
