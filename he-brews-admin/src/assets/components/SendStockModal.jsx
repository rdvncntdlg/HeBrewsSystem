// SendStockModal.js
import React, { useState, useEffect } from 'react';

const SendStockModal = ({ isOpen, onClose, item, fetchStockItems }) => { // Add fetchStockItems prop
  const [branchName, setBranchName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [branches, setBranches] = useState([]); // State to hold branches
  const [loadingBranches, setLoadingBranches] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('https://hebrewssystem.onrender.com/api/branches', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust if necessary
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Filter out branches with branch_id = 0
          const filteredBranches = data.filter(branch => branch.branch_id !== 0);
          setBranches(filteredBranches);
        } else {
          throw new Error('Failed to fetch branches');
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoadingBranches(false);
      }
    };

    if (isOpen) {
      fetchBranches(); // Fetch branches when the modal opens
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (branchName && quantity) {
      try {
        const response = await fetch('https://hebrewssystem.onrender.com/api/send-stock', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust if necessary
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            branchName,
            quantity: parseInt(quantity),
            itemId: item.inventory_id,
            expirationdate: item.expirationdate,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send stock');
        }

        const data = await response.json();
        console.log(data.message);
        fetchStockItems(); // Call fetchStockItems after sending
        onClose(); // Close the modal after sending
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Ensure value is a valid number and within the range
    if (value === '' || (value >= 1 && value <= item.quantity)) {
      setQuantity(value);
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl mb-4">Send Stock for {item.itemname}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Branch Name:</label>
            {loadingBranches ? (
              <div>Loading branches...</div>
            ) : (
              <select
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Select a branch</option>
                {branches.map((branch) => (
                  <option key={branch.branch_id} value={branch.branch_id}>
                    {branch.branchname}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full px-3 py-2 border rounded"
              min="1"
              max={item.quantity} // Set the maximum quantity limit
              required
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendStockModal;