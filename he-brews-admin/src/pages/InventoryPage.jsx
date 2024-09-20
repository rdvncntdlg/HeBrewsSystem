import React from 'react';
import Header from '../assets/components/Header';
import StocksTable from '../assets/components/StocksTable';
import SuppliersTable from '../assets/components/SupplierTable';

function Inventory() {
    return (
      <main className="flex flex-col ml-5 w-[95%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto w-full text-black max-md:mt-10 max-md:max-w-full">
            <Header text="Inventory"/>
            <section>
              <h2 className="self-start mt-14 text-3xl font-bold max-md:mt-10">Stocks</h2>
              <StocksTable />
            </section>
            <section>
              <h2 className="self-start mt-9 text-3xl font-bold">Suppliers</h2>
              <SuppliersTable />
            </section>
          </div>
        </main>
    )
  };
  
  export default Inventory;