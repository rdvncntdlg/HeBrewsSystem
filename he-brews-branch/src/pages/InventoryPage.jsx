import React, { useState } from 'react'; 
import Header from '../assets/components/Header';
import StocksTable from '../assets/components/StocksTable';
import ExpiryTable from '../assets/components/ExpiryTable';

function Inventory() {
  const [stocks, setStocks] = useState([]); // State for stocks

  const expiringItems = stocks.filter((item) => {
    const expirationDate = new Date(item.expirationDate);
    const today = new Date();
    const timeDiff = expirationDate - today;
    return timeDiff > 0 && timeDiff <= 30 * 24 * 60 * 60 * 1000;
  });

  return (
    <div className="h-screen overflow-hidden">
      <Header text="Inventory" />
      
      <main className="flex flex-col lg:flex-row w-full h-full overflow-hidden">
        <div className="flex flex-col w-full lg:w-[60%] px-4 overflow-hidden">
          <section className="mt-4">
            <h2 className="text-3xl font-bold">Stocks</h2>
            <div className="overflow-x-auto">
              <StocksTable stockItems={stocks} />
            </div>
          </section>
        </div>

        <div className="flex flex-col w-full lg:w-[40%] px-4 overflow-hidden">
          <section className="mt-0 flex justify-end">
            <div className="overflow-x-auto w-full max-w-lg"> 
              <ExpiryTable 
                expiringItems={expiringItems}
                className="rounded-lg"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Inventory;
