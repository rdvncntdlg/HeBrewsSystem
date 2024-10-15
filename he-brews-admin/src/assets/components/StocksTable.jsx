import React from 'react';

function StocksTable() {
  const stockItems = [
    { id: "ITEM00001", name: "PLASTIC CUP", quantity: 100 },
    { id: "ITEM00002", name: "NACHOS", quantity: 88 },
    { id: "ITEM00003", name: "LEMON", quantity: 75 },
    { id: "ITEM00004", name: "TISSUE", quantity: 89 },
    { id: "ITEM00005", name: "ICE", quantity: 42 },
    { id: "ITEM00006", name: "CUCUMBER", quantity: 18 },
    { id: "ITEM00007", name: "TOMATO", quantity: 25 },
    { id: "ITEM00008", name: "CHEESE", quantity: 85 },
    { id: "ITEM00009", name: "ONION", quantity: 72 },
    { id: "ITEM00010", name: "GROUNDED MEAT", quantity: 31 },
    { id: "ITEM00011", name: "PASTA", quantity: 45 },
    { id: "ITEM00012", name: "COFFEE BEANS", quantity: 56 },
    { id: "ITEM00013", name: "CARBONARA SAUCE", quantity: 83 }
  ];

  return (
    <div className="mt-5">
      <table className="min-w-full bg-neutral-950 text-white text-sm font-bold rounded-3xl">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-4 py-2 text-left">ITEM ID</th>
            <th className="px-4 py-2 text-left">NAME</th>
            <th className="px-4 py-2 text-left">QUANTITY AVAILABLE</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-zinc-300' : 'bg-white'}>
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2 text-center">{item.name}</td>
              <td className="px-4 py-2 text-center">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StocksTable;
