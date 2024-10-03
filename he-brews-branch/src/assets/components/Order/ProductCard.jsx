import React from 'react';
import { CirclePlus } from 'lucide-react';

// ProductCard.js

function ProductCard({ productId, image, name, price, orderId, onAddToOrder }) {
  const handleAddToOrder = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/orderitems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, name, price, image, orderId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Item added to order:', data);
        // Call the onAddToOrder function and pass the new item data to update the state
        if (onAddToOrder) {
          onAddToOrder({ productId, name, price, image, orderId, quantity: 1 });
        }
      } else {
        console.error('Failed to add item to order');
      }
    } catch (error) {
      console.error('Error adding item to order:', error);
    }
  };

  return (
    <div className="flex flex-col max-w-full font-bold rounded-none h-[178px] w-[140px] m-2">
      <div className="flex flex-col pb-3.5 w-full bg-white rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <img loading="lazy" src={`http://localhost:3000/${image}`} alt={name} className="object-contain w-full rounded-3xl aspect-[1.13]" />
        <div className="relative flex gap-1.5 mt-4 ml-2.5 max-md:mr-2.5">
          <div className="flex flex-col">
            <div className="text-base text-black">{name}</div>
            <div className="self-start mt-1.5 text-sm text-red-700">₱{price}</div>
          </div>
          <CirclePlus
            onClick={handleAddToOrder}
            className="absolute bottom-0 right-0 object-contain shrink-0 w-6 aspect-square pr-2 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
