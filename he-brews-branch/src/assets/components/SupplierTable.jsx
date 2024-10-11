import React from 'react';

function SuppliersTable({ suppliers }) {
  return (
    <div className="mt-3">
      <div className="grid grid-cols-3 gap-4 px-8 py-4 w-full text-sm font-bold text-white bg-neutral-950 rounded-3xl max-md:px-4">
        <div className="text-left">SUPPLIER ID</div>
        <div className="text-left">NAME</div>
        <div className="text-left">PHONE NUMBER</div>
      </div>
      {suppliers.length > 0 ? (
        suppliers.map((supplier, index) => (
          <div
            key={supplier.id}
            className={`grid grid-cols-3 gap-4 items-center py-2 px-8 text-xs ${index % 2 === 0 ? 'bg-zinc-300' : 'bg-white'} max-md:px-4`}
          >
            <div>{supplier.id}</div>
            <div>{supplier.name}</div>
            <div>{supplier.phone || 'N/A'}</div>
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-gray-500">No suppliers available</div>
      )}
    </div>
  );
}

export default SuppliersTable;
