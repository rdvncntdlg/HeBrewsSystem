// RequestModal.js
import React, { useState } from 'react';

const RequestModal = ({ item, onClose }) => {
  const [quantity, setQuantity] = useState(item.total_quantity);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requestData = {
      branch_id: item.branch_id,
      item_id: item.item_id,
      quantity: parseInt(quantity),
    };
  
    try {
      const response = await fetch('https://hebrewscafeserver.onrender.com/api/send-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Request submitted:', result);
      } else {
        console.error('Failed to submit request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    setQuantity(0);
    onClose();
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl mb-4">Request Stock for {item.itemname}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity:</label>
            <input
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              min="1"
              required
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300 mr-2"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;