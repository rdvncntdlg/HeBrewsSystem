import React, { useEffect, useState } from 'react';
import RequestModal from './RequestModal'; // Import the RequestModal component

function StockAlertPage() {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchStockAlerts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/alert-stock`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stock alerts');
        }

        const data = await response.json();
        setStockItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockAlerts();
  }, []); 

  const StockAlertTable = ({ stockItems }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const sortedItems = [...stockItems].sort((a, b) => a.total_quantity - b.total_quantity);
    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleRequest = (item) => {
      setSelectedItem(item);
      setShowModal(true);
    };

    return (
      <div className="w-full mx-auto mt-1 p-4 bg-white shadow-md rounded-lg overflow-hidden"> 
        <h2 className="text-2xl text-black mb-4">Stock Alert</h2>
        
        <table className="w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">ITEM NAME</th>
              <th className="px-4 py-2 text-left">QUANTITY</th>
              <th className="px-4 py-2 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.itemname} className={item.total_quantity < 5 ? 'bg-red-100' : 'bg-white'}>
                  <td className="border px-4 py-2">{item.itemname}</td>
                  <td className="border px-4 py-2">{item.total_quantity}</td>
                  <td className="border px-4 py-2 text-center">
                    <button 
                      onClick={() => handleRequest(item)} 
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Request
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">No low stock items.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300">
            Previous
          </button>
          <div className="flex items-center">
            <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
          </div>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300">
            Next
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <StockAlertTable stockItems={stockItems} />
      {showModal && selectedItem && (
        <RequestModal item={selectedItem} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default StockAlertPage;