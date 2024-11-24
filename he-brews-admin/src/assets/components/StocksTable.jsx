// StocksTable.js
import React, { useState, useEffect } from 'react';
import SendStockModal from './SendStockModal'; // Import the modal component

function StocksTable() {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to fetch stock items
  const fetchStockItems = async () => {
    try {
      const response = await fetch('https://hebrewssystem.onrender.com/admin-stocks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStockItems(data);
      } else {
        throw new Error('Failed to fetch stock items');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockItems(); // Fetch stock items on component mount
  }, []);

  const handleSend = async () => {
    // Call the fetchStockItems function after sending stock
    await fetchStockItems();
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-5">
      <table className="min-w-full bg-neutral-950 text-black text-sm rounded-3xl">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-4 py-2 text-center text-white">ITEM ID</th>
            <th className="px-4 py-2 text-center text-white">NAME</th>
            <th className="px-4 py-2 text-center text-white">QUANTITY AVAILABLE</th>
            <th className="px-4 py-2 text-center text-white">EXPIRATION DATE</th>
            <th className="px-4 py-2 text-center text-white">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.length > 0 ? (
            stockItems.map((item, index) => (
              <tr key={item.inventory_id} className={index % 2 === 0 ? 'bg-zinc-300' : 'bg-white'}>
                <td className="px-4 py-2 text-center text-black">{item.inventory_id}</td>
                <td className="px-4 py-2 text-center text-black">{item.itemname}</td>
                <td className="px-4 py-2 text-center text-black">{item.quantity}</td>
                <td className="px-4 py-2 text-center text-black">{item.expirationdate}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    onClick={() => openModal(item)} // Open modal with selected item
                  >
                    Send
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center text-black">No stock items available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Render the SendStockModal */}
      {selectedItem && (
        <SendStockModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSend={handleSend} // Pass the handleSend function
          fetchStockItems={fetchStockItems} // Pass the fetchStockItems function
          item={selectedItem}
        />
      )}
    </div>
  );
}

export default StocksTable;