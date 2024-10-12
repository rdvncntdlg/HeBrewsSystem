import React, { useState } from 'react';

function SuppliersTable({ suppliers }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;  // Set to 10 items per page

  // Calculate total pages
  const totalPages = Math.ceil(suppliers.length / itemsPerPage);

  // Get the current suppliers for the page
  const indexOfLastSupplier = currentPage * itemsPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - itemsPerPage;
  const currentSuppliers = suppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);

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
    <div className="mt-3">
      {/* Table Header */}
      <div className="grid grid-cols-3 gap-4 px-8 py-4 w-full text-sm font-bold text-white bg-neutral-950 rounded-3xl max-md:px-4">
        <div className="text-center">SUPPLIER ID</div>  {/* Centered text */}
        <div className="text-center">NAME</div>         {/* Centered text */}
        <div className="text-center">PHONE NUMBER</div> {/* Centered text */}
      </div>

      {/* Table Body */}
      {currentSuppliers.length > 0 ? (
        currentSuppliers.map((supplier, index) => (
          <div
            key={supplier.id}
            className={`grid grid-cols-3 gap-4 items-center py-2 px-8 text-xs ${index % 2 === 0 ? 'bg-zinc-300' : 'bg-white'} max-md:px-4`}
          >
            <div className="text-center">{supplier.id}</div>  {/* Centered text */}
            <div className="text-center">{supplier.name}</div> {/* Centered text */}
            <div className="text-center">{supplier.phone || 'N/A'}</div> {/* Centered text */}
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-gray-500">No suppliers available</div>
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

export default SuppliersTable;
