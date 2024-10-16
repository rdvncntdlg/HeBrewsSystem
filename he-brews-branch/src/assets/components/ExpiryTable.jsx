import React, { useState } from 'react';

function ExpiryTable({ expiringItems }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  // Sort the items by expiration date in ascending order
  const sortedItems = [...expiringItems].sort((a, b) => 
    new Date(a.expirationDate) - new Date(b.expirationDate)
  );

  // Calculate total pages
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  // Get current items for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination Handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full mx-auto mt-1 p-4 bg-white shadow-md rounded-lg overflow-hidden"> 
      <h2 className="text-2xl text-black mb-4">Expiration Alert</h2>
      
      {/* Header Row */}
      <div className="grid grid-cols-2 gap-4 px-4 py-4 text-sm font-bold text-gray-700 bg-transparent rounded-lg">
        <div className="text-center">ITEM ID</div>
        <div className="text-center">EXPIRATION DATE</div>
      </div>

      {/* Expiring Items Rows */}
      {currentItems.length > 0 ? (
        currentItems.map((item) => (
          <div key={item.id} className="grid grid-cols-2 gap-4 items-center py-2 px-4 text-xs bg-white">
            <div className="text-center">{item.id}</div>
            <div className="text-center">{item.expirationDate}</div>
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-gray-500">No items expiring soon.</div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300">
          Previous
        </button>
        <div className="flex items-center">
          <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
        </div>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300">
          Next
        </button>
      </div>
    </div>
  );
}

export default ExpiryTable;
