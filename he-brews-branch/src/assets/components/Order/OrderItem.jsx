import React from 'react';

function OrderItem({ item, increaseQuantity, decreaseQuantity }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col">
        <span>{item.itemname}</span>
        <span>₱{item.price}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={decreaseQuantity} // decrease the quantity
          className="px-2 py-1 text-lg font-bold bg-gray-200 rounded"
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={increaseQuantity} // increase the quantity
          className="px-2 py-1 text-lg font-bold bg-gray-200 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default OrderItem;
