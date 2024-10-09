import React from 'react';

function ExpiryTable({ expiringItems }) {
  return (
    <div className="w-[100%] mx-auto mt-8 p-4 bg-white shadow-md rounded-lg"> {/* Box container with padding */}
      <h2 className="text-2xl font-bold mb-4 text-red-600">Expiration Alert</h2> {/* Title with reduced size */}
      
      {/* Header Row */}
      <div className="grid grid-cols-2 gap-4 px-8 py-4 text-sm font-bold text-white bg-neutral-950 rounded-lg">
        <div className="text-left">ITEM ID</div>
        <div className="text-left">EXPIRATION DATE</div>
      </div>

      {/* Expiring Items Rows */}
      {expiringItems.length > 0 ? (
        expiringItems.map((item, index) => (
          <div key={item.id} className={`grid grid-cols-2 gap-4 items-center py-2 px-8 text-xs ${index % 2 === 0 ? 'bg-zinc-300' : 'bg-white'}`}>
            <div>{item.id}</div>
            <div>{item.expirationDate}</div>
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-gray-500">No items expiring soon.</div>
      )}
    </div>
  );
}

export default ExpiryTable;
