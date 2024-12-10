import React, { useState, useEffect } from 'react';

function AddStockModal({ onClose }) {
  const [itemName, setItemName] = useState(''); // Store the selected item_id
  const [quantity, setQuantity] = useState(''); // Store the quantity of the stock
  const [expirationDate, setExpirationDate] = useState(''); // Store the expiration date
  const [stockItems, setStockItems] = useState([]); // Store the fetched stock items from DB

  // Fetch stock items from the backend when the component mounts
  useEffect(() => {
    fetch('https://hebrewscafeserver.onrender.com/api/stock-items')
      .then((response) => response.json())
      .then((data) => setStockItems(data))
      .catch((error) => console.error('Error fetching stock items:', error));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const stockData = {
      item_id: itemName,  // itemName holds the selected item_id
      quantity,
      expirationdate: expirationDate,  // Pass the selected expiration date
    };

    // Send the stock data to the backend
    fetch('https://hebrewscafeserver.onrender.com/api/add-stock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stockData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Stock added successfully:', data);
          onClose(); // Close modal after successful submission
        } else {
          console.error('Error adding stock:', data.error);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4">Add Stock</h2>
        <form onSubmit={handleSubmit}>
          {/* Dropdown for selecting item */}
          <div className="mb-4">
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <select
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            >
              <option value="">Select an item</option>
              {stockItems.map((item, index) => (
                <option key={index} value={item.item_id}>
                  {item.itemname}
                </option>
              ))}
            </select>
          </div>

          {/* Input for Quantity */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Input for Expiration Date */}
          <div className="mb-4">
            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
              Expiration Date
            </label>
            <input
              type="date"
              id="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStockModal;