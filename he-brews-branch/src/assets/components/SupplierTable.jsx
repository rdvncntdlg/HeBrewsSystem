import React from 'react';

function SuppliersTable() {
  const suppliers = [
    { id: "SUPP00001", name: "AAA OPC", phone: "402-0629" },
    { id: "SUPP00002", name: "FRESHPOINT", phone: "723-5645" },
    { id: "SUPP00003", name: "FRESHPOINT", phone: "722-5872" },
    { id: "SUPP00004", name: "AAA OPC", phone: "723-0154" },
    { id: "SUPP00005", name: "ECOLAB", phone: "402-3245" },
    { id: "SUPP00006", name: "LOCAL FARMER'S MARKET", phone: "402-0521" },
    { id: "SUPP00007", name: "COUNTER CULTURE MARKET", phone: "722-6548" },
    { id: "SUPP00008", name: "AAA OPC", phone: "723-5214" }
  ];

  return (
    <div className="mt-3">
      <div className="grid grid-cols-3 gap-4 px-8 py-4 w-full text-sm font-bold text-white bg-neutral-950 rounded-3xl max-md:px-4">
        <div className="text-left">SUPPLIER ID</div>
        <div className="text-left">NAME</div>
        <div className="text-left">PHONE NUMBER</div>
      </div>
      {suppliers.map((supplier, index) => (
        <div key={supplier.id} className={`grid grid-cols-3 gap-4 items-center py-2 px-8 text-xs ${index % 2 === 0 ? 'bg-zinc-300' : 'bg-white'} max-md:px-4`}>
          <div>{supplier.id}</div>
          <div>{supplier.name}</div>
          <div>{supplier.phone}</div>
        </div>
      ))}
    </div>
  );
}

export default SuppliersTable;
