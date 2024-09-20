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
      <div className="flex flex-col justify-center items-start px-16 py-4 w-full text-sm font-bold text-white rounded-3xl bg-neutral-950 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-10 justify-center items-start max-md:max-w-full">
          <div className="text-center">ITEM ID</div>
          <div className="text-center">NAME</div>
          <div className="text-center">QUANTITY AVAILABLE</div>
          <div>SUPPLIER NAME</div>
        </div>
      </div>
      {stockItems.map((item, index) => (
        <div key={item.id} className={`flex flex-wrap gap-5 justify-between py-2 pr-8 pl-16 w-full text-xs ${index % 2 === 0 ? 'bg-zinc-300' : 'bg-white'} max-md:px-5 max-md:max-w-full`}>
          <div className="flex gap-10 my-auto max-md:max-w-full">
            <div>{item.id}</div>
            <div className="text-center">{item.name}</div>
            <div className="text-center">{item.quantity}</div>
          </div>
          <div className="flex gap-10 text-center">
            <div className="my-auto">{item.supplier}</div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/85034424f58332a137208732a249e0154615534d1dc9f3c1502bd5b32370f2ae?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e" alt="" className="object-contain shrink-0 aspect-[1.07] w-[15px]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default StocksTable;