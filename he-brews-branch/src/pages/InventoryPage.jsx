import React, { useState, useEffect } from 'react'; 
import Header from '../assets/components/Header';
import StocksTable from '../assets/components/StocksTable';
import ExpiryTable from '../assets/components/ExpiryTable';
import StockAlertTable from '../assets/components/StockAlertTable';

function Inventory() { // Accept branch as a prop
  const [stocks, setStocks] = useState([]); // State for stocks

  return (
    <div className="h-screen overflow-hidden">
      <Header text="Inventory" />
      
      <main className="flex flex-col lg:flex-row w-full h-full overflow-hidden">
        <div className="flex flex-col w-full lg:w-[60%] px-4 overflow-hidden">
          <section className="mt-4">
            <h2 className="text-3xl font-bold">Stocks</h2>
            <div className="overflow-x-auto">
              <StocksTable />
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
    </div>
  );
}

export default Inventory;