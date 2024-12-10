import React, { useEffect, useState } from 'react';

function ExpiryTable() {
  const [expiringItems, setExpiringItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    const fetchExpiringItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }

      try {
        const response = await fetch(`https://hebrewscafeserver.onrender.com/expiring-items`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch expiring items');
        }

        const data = await response.json();
        setExpiringItems(data); // Set the fetched expiring items to state
      } catch (error) {
        console.error('Error fetching expiring items:', error);
      }
    };

    fetchExpiringItems();
  }, []);

  // Sort the items by expiration date in ascending order
  const sortedItems = [...expiringItems].sort((a, b) => 
    new Date(a.expirationdate) - new Date(b.expirationdate)
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

      {/* Table for Expiring Items */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">ITEM ID</th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">EXPIRATION DATE</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.inventory_id}>
                <td className="px-4 py-2 text-sm text-gray-700">{item.itemname}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{new Date(item.expirationdate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="px-4 py-2 text-center text-gray-500">No items expiring soon.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 1} 
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Previous
        </button>
        <div className="flex items-center">
          <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
        </div>
        <button 
          onClick={nextPage} 
          disabled={currentPage === totalPages} 
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ExpiryTable;