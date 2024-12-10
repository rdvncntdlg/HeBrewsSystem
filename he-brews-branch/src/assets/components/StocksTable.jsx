import React, { useState, useEffect } from 'react';

function StocksTable() {
  const [stockItems, setStockItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStockItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found for authentication.');
        return;
      }


      setIsLoading(true);
      setError(null); // Reset error state before fetching

      try {
        const response = await fetch(`https://hebrewscafeserver.onrender.com/stocks`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        setStockItems(data); // Set the fetched stock items to state
      } catch (error) {
        console.error('Error fetching stock items:', error);
        setError('Failed to load stock items.'); // Set error state
      } finally {
        setIsLoading(false); // Stop loading state
      }
    };

    fetchStockItems();
  }, []); // Fetch stock items whenever branch_id changes

  // Check for unique stock IDs
  const uniqueStockItems = [...new Map(stockItems.map(item => [item.inventory_id, item])).values()];

  // Calculate total pages
  const totalPages = Math.ceil(uniqueStockItems.length / itemsPerPage);

  // Get the current stock items for the page
  const indexOfLastItem = currentPage * itemsPerPage; // Last item index for current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // First item index for current page
  const currentItems = uniqueStockItems.slice(indexOfFirstItem, indexOfLastItem); // Get items for current page

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
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
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
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
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