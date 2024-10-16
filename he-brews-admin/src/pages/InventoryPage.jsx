import React, { useState } from 'react';
import Header from '../assets/components/Header';
import StocksTable from '../assets/components/StocksTable';
import AddStockModal from '../assets/components/AddStockModal'; // Import the modal component
import StockRequestsModal from '../assets/components/StockRequestsModal'; // Import the stock requests modal

function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage Add Stock modal visibility
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false); // State for Stock Requests modal

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openRequestsModal = () => {
    setIsRequestsModalOpen(true);
  };

  const closeRequestsModal = () => {
    setIsRequestsModalOpen(false);
  };

  return (
    <main className="flex flex-col ml-5 w-[95%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col self-stretch my-auto w-full text-black max-md:mt-10 max-md:max-w-full">
        <Header text="Inventory" />
        <section>
          <div className="flex justify-between items-center mt-14 max-md:mt-10">
            <h2 className="text-3xl font-bold">Stocks</h2>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={openModal} // Open Add Stock modal
              >
                Add Stock
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={openRequestsModal} // Open Stock Requests modal
              >
                Stock Requests
              </button>
            </div>
          </div>
          <StocksTable />
        </section>

        {/* Conditionally render the AddStockModal */}
        {isModalOpen && (
          <AddStockModal onClose={closeModal} />
        )}

        {/* Conditionally render the StockRequestsModal */}
        {isRequestsModalOpen && (
          <StockRequestsModal onClose={closeRequestsModal} />
        )}
      </div>
    </main>
  );
}

export default Inventory;
