import React from 'react';

function StocksTable({ stockItems }) {
  return (
    <div className="mt-5">
      <div className="grid grid-cols-4 gap-4 px-8 py-4 w-full text-sm font-bold text-white bg-neutral-950 rounded-3xl max-md:px-4">
        <div className="text-left">ITEM ID</div>
        <div className="text-left">NAME</div>
        <div className="text-left">QUANTITY</div>
        <div className="text-left">SUPPLIER</div>
      </div>

      {stockItems.length > 0 ? (
        stockItems.map((item, index) => (
          <div
            key={item.id}
            className={`grid grid-cols-4 gap-4 items-center py-2 px-8 text-xs ${index % 2 === 0 ? 'bg-zinc-300' : 'bg-white'} max-md:px-4`}
          >
            <div>{item.id}</div>
            <div>{item.name}</div>
            <div>{item.quantity}</div>
            <div>{item.supplier}</div>
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-gray-500">No stock items available</div>
      )}
    </div>
  );
}

export default StocksTable;
