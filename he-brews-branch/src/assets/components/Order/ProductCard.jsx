import React from 'react';

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
    <div
      className="flex flex-col max-w-[200px] w-full font-bold rounded-lg h-[200px] m-3 relative cursor-pointer"
      onClick={handleAddToOrder} // Apply the click handler to the whole card
    >
      <div className="flex flex-col pb-4 w-full bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        {/* Image with top-left and top-right border */}
        <img 
          loading="lazy" 
          src={image}
          alt={name} 
          className="object-cover w-full h-[150px] rounded-tl-lg rounded-tr-lg border-t-4 border-t-gray-300" // Apply rounded corners (lg) and border on top-left and top-right
        />
        <div className="flex flex-col gap-2 mt-4 ml-2.5">
          <div className="text-base text-black">{name}</div>
          <div className="self-start mt-1.5 text-sm text-red-700">₱{price}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
