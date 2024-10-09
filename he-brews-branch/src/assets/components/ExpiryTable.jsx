import React from 'react';

function ExpiryTable({ expiringItems }) {
  return (
    <div className="mt-10 p-5 bg-white rounded-3xl shadow-lg w-full max-w-lg"> {/* Added styling for the box */}
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Expiration Alert</h2> {/* Title styling */}
      
      {/* Header Row */}
      <div className="grid grid-cols-2 gap-4 px-8 py-4 text-sm font-bold text-white bg-red-600 rounded-3xl max-md:px-4">
        <div className="text-left">ITEM ID</div>
        <div className="text-left">EXPIRATION DATE</div>
      </div>
      
      {/* Expiring Items Rows */}
      {expiringItems.length > 0 ? (
        expiringItems.map((item, index) => (
          <div key={item.id} className={`grid grid-cols-2 gap-4 items-center py-2 px-8 text-xs ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} max-md:px-4`}>
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
