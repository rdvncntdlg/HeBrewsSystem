// CompletedTable.js
import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react'; // Import the eye icon from lucide-react

const CompletedTable = () => {
  const [completedRequests, setCompletedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedRequests = async () => {
      try {
        const response = await fetch('https://hebrewssystem.onrender.com/api/stock-requests/Completed'); // Update the URL if necessary
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCompletedRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        {completedRequests.map((request) => (
          <tr key={request.request_id}>
            <td className="border-b">{request.request_id}</td>
            <td className="border-b">{request.branch_id}</td>
            <td className="border-b">{request.request_date}</td>
            <td className="border-b">
              <button className="flex items-center text-blue-500">
                <Eye size={20} className="mr-1" /> View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompletedTable;
