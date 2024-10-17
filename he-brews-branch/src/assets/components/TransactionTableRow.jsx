import React from 'react';

function TransactionTableRow({ transaction, isEven }) {
  return (
    <tr className={isEven ? 'bg-gray-100' : 'bg-white'}>
      <td className="text-center py-3 px-4 border">{transaction.id}</td>
      <td className="text-center py-3 px-4 border">{transaction.customer}</td>
      <td className="text-center py-3 px-4 border">{transaction.staff}</td>
      <td className="text-center py-3 px-4 border">{transaction.amount}</td>
      <td className="text-center py-3 px-4 border">{transaction.paymentMethod}</td>
      <td className="text-center py-3 px-4 border">{transaction.date}</td>
      <td className="text-center py-3 px-4 border">{transaction.branch}</td>
    </tr>
  );
}

export default TransactionTableRow;
