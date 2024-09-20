import React from 'react';

function TransactionTableHeader() {
  return (
    <div className="flex flex-col justify-center px-16 py-4 mt-12 w-full text-sm font-bold text-white rounded-3xl bg-neutral-950 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-start max-md:max-w-full">
        <div>INVOICE ID</div>
        <div>CUSTOMER</div>
        <div className="text-center">STAFF</div>
        <div>AMOUNT</div>
        <div>DATE</div>
        <div>PAYMENT METHOD</div>
        <div>BRANCH</div>
      </div>
    </div>
  );
}

export default TransactionTableHeader;