import React from 'react';

function StocksTable() {
  const stockItems = [
    { id: "ITEM00001", name: "PLASTIC CUP", quantity: 100, supplier: "GRAND CHAMP PACKAGING" },
    { id: "ITEM00002", name: "NACHOS", quantity: 88, supplier: "CITIMART" },
    { id: "ITEM00003", name: "LEMON", quantity: 75, supplier: "CITIMART" },
    { id: "ITEM00004", name: "TISSUE", quantity: 89, supplier: "GRAND CHAMP PACKAGING" },
    { id: "ITEM00005", name: "ICE", quantity: 42, supplier: "CITIMART" },
    { id: "ITEM00006", name: "CUCUMBER", quantity: 18, supplier: "CITIMART" },
    { id: "ITEM00007", name: "TOMATO", quantity: 25, supplier: "CITIMART" },
    { id: "ITEM00008", name: "CHEESE", quantity: 85, supplier: "CITIMART" },
    { id: "ITEM00009", name: "ONION", quantity: 72, supplier: "CITIMART" },
    { id: "ITEM00010", name: "GROUNDED MEAT", quantity: 31, supplier: "CITIMART" },
    { id: "ITEM00011", name: "PASTA", quantity: 45, supplier: "CITIMART" },
    { id: "ITEM00012", name: "COFFEE BEANS", quantity: 56, supplier: "COUNTER CULTURE COFFEE" },
    { id: "ITEM00013", name: "CARBONARA SAUCE", quantity: 83, supplier: "CITIMART" }
  ];

  return (
    <div className="mt-5">
      <div className="grid grid-cols-4 gap-4 px-8 py-4 w-full text-sm font-bold text-white bg-neutral-950 rounded-3xl max-md:px-4">
        <div className="text-left">ITEM ID</div>
        <div className="text-left">NAME</div>
        <div className="text-left">QUANTITY</div>
        <div className="text-left">SUPPLIER</div>
      </div>
      {stockItems.map((item, index) => (
        <div key={item.id} className={`grid grid-cols-4 gap-4 items-center py-2 px-8 text-xs ${index % 2 === 0 ? 'bg-zinc-300' : 'bg-white'} max-md:px-4`}>
          <div>{item.id}</div>
          <div>{item.name}</div>
          <div>{item.quantity}</div>
          <div>{item.supplier}</div>
        </div>
      ))}
    </div>
  );
}

export default StocksTable;
