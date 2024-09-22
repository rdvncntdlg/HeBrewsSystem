import React, { useState } from 'react';
import OrderItem from './OrderItem';
import { ChevronDown, ChevronUp, Download } from 'lucide-react'; // Adding lucide-react icons

const OrderCard = ({ name, orderId, itemCount, totalPrice, status: initialStatus, items }) => {
  const [showItems, setShowItems] = useState(true); // State to toggle order items visibility
  const [status, setStatus] = useState(initialStatus); // State for status dropdown

  const toggleItems = () => {
    setShowItems(!showItems);
  };

  // Handle status change from the dropdown
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="flex flex-col px-5 py-4 w-full bg-custom-brown rounded-md shadow-[0px_0px_4px_rgba(0,0,0,0.15)] max-md:max-w-full mb-4">
      <div className="flex flex-wrap gap-5 justify-between max-md:max-w-full">
        <div className="flex flex-col text-lg font-bold">
          <div className="text-stone-700 max-md:mr-1.5">{name}</div>
          <div className="mt-1 text-xs text-neutral-400">
            <span>Order Id :</span> {orderId} <span className="text-zinc-300"> |</span> {itemCount} Item's
          </div>
          <div className="self-start mt-2 text-green-600">{totalPrice}</div>
        </div>
        <div className="flex flex-col self-start text-xs whitespace-nowrap">
          <div className="flex items-center gap-2 justify-between self-end max-w-full font-bold">
            {/* Status Dropdown */}
            <select 
              value={status} 
              onChange={handleStatusChange}
              className={`px-2.5 py-1 rounded ${
                status === 'Done' ? 'text-green-600 bg-emerald-100' : 'text-yellow-500 bg-orange-100'
              }`}
            >
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
            
            {/* Toggle Button */}
            <button onClick={toggleItems} className="text-gray-500 hover:text-gray-700">
              {showItems ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex gap-5 justify-between mt-8 text-neutral-600">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/288ad7b5c87ffd273cfeb1960519fc6803c4ef0535a1e51b9ee3f2c28d0c0bf5?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
              alt=""
              className="object-contain shrink-0 my-auto aspect-[1.39] w-[18px]"
            />
            <div className="flex shrink-0 w-px border border-solid bg-zinc-100 border-neutral-600 h-[18px]" />
            <div className='flex gap-2 justify-center items-center'>Invoice <Download className='size-3'/></div>
          </div>
        </div>
      </div>

      {/* Render Order Items only if showItems is true */}
      {showItems &&
        items.map((item, index) => <OrderItem key={index} {...item} />)}
    </div>
  );
};

export default OrderCard;
