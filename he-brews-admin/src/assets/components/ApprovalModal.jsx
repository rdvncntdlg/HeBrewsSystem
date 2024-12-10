import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react'; // Import the close icon

const ApprovalModal = ({ onClose, request }) => {
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (request && request.item_id) { // Ensure request and item_id are available
        setLoading(true);
        try {
          const response = await fetch('https://hebrewscafeserver.onrender.com/api/approve-request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item_id: request.item_id, requested_quantity: request.quantity }), // Send item_id from the request
          });

          if (!response.ok) {
            throw new Error('Failed to fetch item details');
          }

          const data = await response.json();
          setItemDetails(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchItemDetails();
  }, [request]); // Re-run this effect whenever the request changes

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[80%] max-w-md p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Confirm Approval</h2>

        {/* Display request details in a table */}
        <div className="mb-4 overflow-x-auto">
          <h3 className="text-m font-bold mb-4">
            Request ID: {request.request_id}<br />
            Request Date: {request.request_date}
          </h3>
          {loading ? (
            <p>Loading item details...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="border-b py-2 text-center">Inventory ID</th>
                  <th className="border-b py-2 text-center">Item Name</th>
                  <th className="border-b py-2 text-center">Quantity</th>
                  <th className="border-b py-2 text-center">Expiration Date</th>
                </tr>
              </thead>
              <tbody>
                {itemDetails.map((item) => (
                  <tr key={item.item_id}>
                    <td className="border-b py-2 text-center font-semibold">{item.inventory_id}</td>
                    <td className="border-b py-2 text-center font-semibold">{item.itemname}</td>
                    <td className="border-b py-2 text-center">{item.quantity}</td>
                    <td className="border-b py-2 text-center">{item.expirationdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Confirmation buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              try {
                const response = await fetch('https://hebrewscafeserver.onrender.com/api/confirm-approval', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    request_id: request.request_id,  // Request ID from the current request
                    itemDetails,                     // The item details fetched earlier, including inventory_id
                    branch_id: request.branch_id,     // Assuming branch_id is available in the request
                  }),
                });

                if (!response.ok) {
                  throw new Error('Failed to confirm approval');
                }

                const data = await response.json();
                console.log('Confirmation successful:', data);
                onClose();  // Close the modal after successful confirmation
              } catch (error) {
                console.error('Error confirming approval:', error);
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Confirm
          </button>


        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;