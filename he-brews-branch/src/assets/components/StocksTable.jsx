<<<<<<< HEAD
import React, { useEffect, useState } from 'react';

function StocksTable() {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStockItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/inventory');
        if (!response.ok) {
          throw new Error('Failed to fetch stock items');
        }
        const data = await response.json();
        setStockItems(data); // Assuming data is an array of stock items
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockItems();
  }, []);

  return (
    <div className="mt-5">
      {loading ? (
        <div className="text-center py-4 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
=======
import React, { useState } from 'react';

function StocksTable({ stockItems }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;  // Set to 10 items per page

  // Calculate total pages
  const totalPages = Math.ceil(stockItems.length / itemsPerPage);

  // Get the current stock items for the page
  const indexOfLastItem = currentPage * itemsPerPage;  // Last item index for current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // First item index for current page
  const currentItems = stockItems.slice(indexOfFirstItem, indexOfLastItem); // Get items for current page

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Move to next page
    }
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Move to previous page
    }
  };

  return (
    <div className="mt-5">
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 px-8 py-4 w-full text-sm font-bold text-white bg-neutral-950 rounded-3xl max-md:px-4">
        <div className="text-center">ITEM ID</div>  {/* Centered text */}
        <div className="text-center">NAME</div>     {/* Centered text */}
        <div className="text-center">QUANTITY</div> {/* Centered text */}
        <div className="text-center">SUPPLIER</div> {/* Centered text */}
      </div>

      {/* Table Body */}
      {currentItems.length > 0 ? (
        currentItems.map((item, index) => (
          <div
            key={item.id}
            className={`grid grid-cols-4 gap-4 items-center py-2 px-8 text-xs ${index % 2 === 0 ? 'bg-zinc-300' : 'bg-white'} max-md:px-4`}
          >
            <div className="text-center">{item.id}</div>
            <div className="text-center">{item.name}</div>
            <div className="text-center">{item.quantity}</div>
            <div className="text-center">{item.supplier}</div>
          </div>
        ))
>>>>>>> bb3bb46608ec10b2c5777c4df1feca7441b361de
      ) : (
        <table className="min-w-full bg-neutral-950 rounded-3xl">
          <thead>
            <tr className="text-sm font-bold text-white bg-neutral-800">
              <th className="px-8 py-4 text-left">ITEM ID</th>
              <th className="px-8 py-4 text-left">NAME</th>
              <th className="px-8 py-4 text-left">QUANTITY</th>
              <th className="px-8 py-4 text-left">EXPIRATION DATE</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.length > 0 ? (
              stockItems.map((item, index) => (
                <tr key={item.inventory_id} className={`${index % 2 === 0 ? 'bg-zinc-300' : 'bg-white'} text-xs`}>
                  <td className="px-8 py-2">{item.inventory_id}</td>
                  <td className="px-8 py-2">{item.itemname}</td>
                  <td className="px-8 py-2">{item.quantity}</td>
                  <td className="px-8 py-2">{new Date(item.expirationdate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No stock items available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          className={`px-4 py-2 bg-gray-700 text-white rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === 1} // Disable if on the first page
        >
          Previous
        </button>

        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          className={`px-4 py-2 bg-gray-700 text-white rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === totalPages} // Disable if on the last page
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StocksTable;
