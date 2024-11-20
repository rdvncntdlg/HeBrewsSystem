import React, { useState } from 'react';
import OrderItem from './OrderItem';
import { ChevronDown, ChevronUp, Download, ShoppingBag, Utensils } from 'lucide-react';

const OrderCard = ({ name, orderId, itemCount, totalPrice, status: initialStatus, type, items, onAccept, onReject }) => {
  const [showItems, setShowItems] = useState(true); // State to toggle order items visibility
  const [status, setStatus] = useState(initialStatus); // State for status

  const toggleItems = () => {
    setShowItems(!showItems);
  };

  // Function to handle accept/reject actions
  const handleAccept = () => {
    setStatus('Accepted');
    onAccept(orderId);
  };

  const handleReject = () => {
    setStatus('Rejected');
    onReject(orderId);
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
            {/* Accept and Reject Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handleReject}
                className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-700"
              >
                X
              </button>
              <button
                onClick={handleAccept}
                className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-700"
              >
                ✓
              </button>
            </div>

            {/* Toggle Button */}
            <button onClick={toggleItems} className="text-gray-500 hover:text-gray-700">
              {showItems ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex gap-5 justify-between mt-8 text-neutral-600">
            {type === 'Dine-in' ? (
              <Utensils className="size-4" />
            ) : (
              <ShoppingBag className="size-4" />
            )}
            <div className="flex shrink-0 w-px border border-solid bg-zinc-100 border-neutral-600 h-[18px]" />
            <div className="flex gap-2 justify-center items-center">Invoice <Download className="size-3" /></div>
          </div>
        </div>
      </div>

      {/* Render Order Items only if showItems is true */}
      {showItems && items.map((item, index) => <OrderItem key={index} {...item} />)}
    </div>
  );
};

export default OrderCard;