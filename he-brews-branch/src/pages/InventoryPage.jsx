import React, { useState } from 'react';
import Header from '../assets/components/Header';
import StocksTable from '../assets/components/StocksTable';
import ExpiryTable from '../assets/components/ExpiryTable';
import StockAlertTable from '../assets/components/StockAlertTable';
import StockRequestTable from '../assets/components/StockRequestTable';

function Inventory() { // Accept branch as a prop
  const [stocks, setStocks] = useState([]); // State for stocks
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="h-screen overflow-hidden">
      <Header text="Inventory" />

      <main className="flex flex-col lg:flex-row w-full h-full overflow-hidden">
        <div className="flex flex-col w-full lg:w-[60%] px-4 overflow-hidden">
          <section className="mt-4">
            <h2 className="text-3xl font-bold">Stocks</h2>
            <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={toggleModal}
              >
                View Stock Requests
              </button>
            <div className="overflow-x-auto">
              <StocksTable />
              
              {/* Button to view stock requests */}
              
            </div>
          </section>
        </div>

        <div className="flex flex-col w-full lg:w-[40%] px-4 overflow-hidden">
          <section className="mt-0 flex justify-end">
            <div className="overflow-x-auto w-full max-w-lg"> 
              <ExpiryTable />
              <StockAlertTable />
            </div>
          </section>
        </div>
      </main>

      {/* Modal for Stock Requests */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-2xl p-6 relative">
            
            {/* StockRequestTable inside the modal */}
            <div className="overflow-x-auto">
              <StockRequestTable />
            </div>

            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;