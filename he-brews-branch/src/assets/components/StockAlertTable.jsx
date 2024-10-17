import React, { useState } from 'react';

function StockAlertTable({ stockItems }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  // Sort the items by quantity in ascending order
  const sortedItems = [...stockItems].sort((a, b) => a.quantity - b.quantity);

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

  // Function to handle request action
  const handleRequest = (item) => {
    console.log(`Requesting more stock for: ${item.itemname}`);
    // Add logic to handle the request, like an API call
  };

  return (
    <div className="w-full mx-auto mt-1 p-4 bg-white shadow-md rounded-lg overflow-hidden"> 
      <h2 className="text-2xl text-black mb-4">Stock Alert</h2>
      
      {/* Stock Alert Table */}
      <table className="w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">ITEM NAME</th>
            <th className="px-4 py-2 text-left">QUANTITY</th>
            <th className="px-4 py-2 text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.id} className={`${item.quantity < 5 ? 'bg-red-100' : 'bg-white'}`}>
                <td className="border px-4 py-2">{item.itemname}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2 text-center">
                  <button 
                    onClick={() => handleRequest(item)} 
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Request
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">No low stock items.</td>
            </tr>
          )}
        </tbody>
      </table>

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

export default StockAlertTable;