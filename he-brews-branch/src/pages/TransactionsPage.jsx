import React from 'react';
import Header from '../assets/components/Header';
import SalesChart from '../assets/components/SalesChart';
import TransactionTable from '../assets/components/TransactionTable';

function Transactions() {
    return (
      <main className="flex flex-col ml-5 w-[95%] max-md:ml-0 max-md:w-full">
          <Header text="Transactions"/>
          <TransactionTable />
        </main>
    )
  };
  
  export default Transactions;

  