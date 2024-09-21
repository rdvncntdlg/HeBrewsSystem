import React from 'react';

function TransactionTableRow({ transaction, isEven }) {
  const rowClass = isEven
    ? "flex gap-10 px-20 py-2.5 text-xs text-center bg-zinc-300 max-md:px-5 max-md:max-w-full"
    : "flex gap-10 px-16 py-2.5 text-xs text-center bg-white max-md:px-5 max-md:max-w-full";

  return (
    <div className={rowClass}>
      <div className="grow">{transaction.id}</div>
      <div>{transaction.customer}</div>
      <div>{transaction.staff}</div>
      <div>{transaction.amount}</div>
      <div>{transaction.date}</div>
      <div className="self-start">{transaction.paymentMethod}</div>
      <div className="self-start">{transaction.branch}</div>
    </div>
  );
}

export default TransactionTableRow;