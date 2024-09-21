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
      <div className="flex flex-col justify-center items-start px-16 py-4 w-full text-sm font-bold text-center text-white rounded-3xl bg-neutral-950 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-10 justify-center items-start max-md:max-w-full">
          <div>SUPPLIER ID</div>
          <div>NAME</div>
          <div>PHONE NUMBER</div>
        </div>
      </div>
      {suppliers.map((supplier, index) => (
        <div key={supplier.id} className={`flex gap-5 justify-between items-center py-2 pr-9 pl-20 text-xs text-center ${index % 2 === 0 ? 'bg-zinc-300' : 'bg-white'} max-md:px-5 max-md:max-w-full`}>
          <div className="self-stretch my-auto">{supplier.id}</div>
          <div className="self-stretch my-auto">{supplier.name}</div>
          <div className="self-stretch my-auto">{supplier.phone}</div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/85034424f58332a137208732a249e0154615534d1dc9f3c1502bd5b32370f2ae?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e" alt="" className="object-contain shrink-0 self-stretch aspect-[1.07] w-[15px]" />
        </div>
      ))}
    </div>
  );
}

export default SuppliersTable;