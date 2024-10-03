import React, { useState } from 'react';
import ProductCard from './ProductCard';
import OrderSummary from './OrderSummary';

function OrderPage() {
  const [orderItems, setOrderItems] = useState([]);

  const handleAddToOrder = (product) => {
    setOrderItems((prevItems) => {
      // Check if the item is already in the order
      const existingItem = prevItems.find((item) => item.name === product.name);
      
      if (existingItem) {
        // If item exists, increase the quantity
        return prevItems.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If item is new, add it to the order with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div>
      <div className="product-list">
        <ProductCard
          image="https://example.com/image.jpg"
          name="Chicken Whooper"
          price="$14.00"
          onAddToOrder={handleAddToOrder}
        />
        {/* Add more ProductCard components as needed */}
      </div>

      <OrderSummary orderItems={orderItems} />
    </div>
  );
}

export default OrderPage;
