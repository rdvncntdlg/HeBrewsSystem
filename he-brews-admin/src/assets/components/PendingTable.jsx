import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import ApprovalModal from './ApprovalModal'; // Import the ApprovalModal

const PendingTable = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null); // For managing the selected request
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/stock-requests/pending');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPendingRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleViewClick = (request) => {
    setSelectedRequest(request); // Set the selected request
    setIsModalOpen(true); // Open the modal
  };

  const handleConfirmApproval = (requestId) => {
    // Handle the approval confirmation (e.g., send a request to the server)
    console.log(`Request ${requestId} approved.`);
    setIsModalOpen(false); // Close the modal after confirmation
  };

  return (
    <div>
      {/* Render the table */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border-b text-center py-2">Request ID</th>
            <th className="border-b text-center py-2">Branch Name</th>
            <th className="border-b text-center py-2">Item Name</th>
            <th className="border-b text-center py-2">Quantity</th>
            <th className="border-b text-center py-2">Request Date</th>
            <th className="border-b text-center py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequests.map((request) => (
            <tr key={request.request_id}>
              <td className="border-b text-center py-2">{request.request_id}</td>
              <td className="border-b text-center py-2">{request.branchname}</td>
              <td className="border-b text-center py-2">{request.itemname}</td>
              <td className="border-b text-center py-2">{request.quantity}</td>
              <td className="border-b text-center py-2">{request.request_date}</td>
              <td className="border-b text-center py-2 flex justify-center">
                <button 
                  onClick={() => handleViewClick(request)} 
                  className="flex items-center justify-center px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <Check className="w-4 h-4 mr-1" />
                  <span className="hidden md:inline">Approve</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the modal if a request is selected */}
      {isModalOpen && selectedRequest && (
        <ApprovalModal
          onClose={() => setIsModalOpen(false)}
          request={selectedRequest}
          onConfirm={handleConfirmApproval}
        />
      )}
    </div>
  );
};

export default PendingTable;