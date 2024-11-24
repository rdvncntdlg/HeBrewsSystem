import React, { useState, useEffect } from 'react';

const StockRequestTable = () => {
  const [stockRequests, setStockRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockRequests = async () => {
      try {
        const response = await fetch('https://hebrewssystem.onrender.com/api/requests', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStockRequests(data);
        } else {
          console.error('Failed to fetch stock requests');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockRequests();
  }, []);

  // Handle receiving stock
  const handleReceived = async (request_id) => {
    try {
      const response = await fetch('https://hebrewssystem.onrender.com/api/receive-items', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ request_id }), // Send the request_id to backend
      });

      if (response.ok) {
        // Update the status to "Received" in the UI after success
        setStockRequests(
          stockRequests.map((request) =>
            request.request_id === request_id
              ? { ...request, status: 'Received' }
              : request
          )
        );
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl text-black mb-4">Stock Requests</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Item Name</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {stockRequests.length > 0 ? (
            stockRequests.map((request) => (
              <tr key={request.request_id} className="border-b">
                <td className="px-4 py-2">{request.itemname}</td>
                <td className="px-4 py-2">{request.quantity}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      request.status === 'Received'
                        ? 'bg-green-100 text-green-700'
                        : request.status === 'Approved'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleReceived(request.request_id)}
                    disabled={request.status !== 'Approved'}
                    className={`px-4 py-2 text-white rounded ${
                      request.status === 'Approved'
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Received
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center">
                No stock requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockRequestTable;