import React, { useState } from 'react';
import PendingTable from './PendingTable';
import ApprovedTable from './ApprovedTable';
import CompletedTable from './CompletedTable';
import { X } from 'lucide-react'; // Import the X icon

function StockRequestsModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('pending');

  const renderTable = () => {
    switch (activeTab) {
      case 'pending':
        return <PendingTable />;
      case 'approved':
        return <ApprovedTable />;
      case 'completed':
        return <CompletedTable />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[80%] h-[80%] p-6 overflow-auto relative">
        {/* X Icon for closing the modal */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Stock Requests</h2>
        <div className="mb-4">
          <button 
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 ${activeTab === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-md`}
          >
            Pending
          </button>
          <button 
            onClick={() => setActiveTab('approved')}
            className={`px-4 py-2 ${activeTab === 'approved' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-md`}
          >
            Approved
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 ${activeTab === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-md`}
          >
            Completed
          </button>
        </div>
        <div className="overflow-auto">
          {renderTable()}
        </div>
      </div>
    </div>
  );
}

export default StockRequestsModal;