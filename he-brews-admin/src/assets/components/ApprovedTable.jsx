import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react'; // Import the Eye icon

const ApprovedTable = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedRequests = async () => {
      try {
        const response = await fetch('https://hebrewscafeserver.onrender.com/api/stock-requests/Approved'); // Ensure the correct URL is used
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApprovedRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleViewClick = (requestId) => {
    // Logic for handling the view button click can be implemented here
    console.log(`View request ID: ${requestId}`);
  };

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
      <tr>
          <th className="border-b">Request ID</th>
          <th className="border-b">Branch ID</th>
          <th className="border-b">Request Date</th>
          <th className="border-b">Action</th>
        </tr>
      </thead>
      <tbody>
        {approvedRequests.map((request) => (
          <tr key={request.request_id}>
            <td className="border-b">{request.request_id}</td>
            <td className="border-b">{request.branch_id}</td>
            <td className="border-b">{request.request_date}</td>
            <td className="border-b">
              <button 
                onClick={() => handleViewClick(request.request_id)} 
                className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Eye className="w-4 h-4 mr-1" /> {/* Eye icon */}
                <span className="hidden md:inline">View</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApprovedTable;
