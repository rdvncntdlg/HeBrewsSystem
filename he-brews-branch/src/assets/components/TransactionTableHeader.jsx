import React from 'react';

function TransactionTableHeader() {
  return (
    <thead>
      <tr className="bg-neutral-950 text-white text-sm font-bold">
        <th className="px-4 py-2">INVOICE ID</th>
        <th className="px-4 py-2">CUSTOMER</th>
        <th className="px-4 py-2">STAFF</th>
        <th className="px-4 py-2">AMOUNT</th>
        <th className="px-4 py-2">DATE</th>
        <th className="px-4 py-2">PAYMENT METHOD</th>
        <th className="px-4 py-2">BRANCH</th>
      </tr>
    </thead>
  );
}

export default TransactionTableHeader;
