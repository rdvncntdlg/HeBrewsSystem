import React, { useState, useEffect } from 'react'; 
import Header from '../assets/components/Header';
import MenuCategories from '../assets/components/Order/MenuCategories';
import ProductGrid from '../assets/components/Order/ProductGrid';
import OrderSummary from '../assets/components/Order/OrderSummary';

function OrderPage() {

  const [orderId, setOrderId] = useState('');

  // Generate a new order ID when the component mounts
  useEffect(() => {
    const generatedOrderId = `${Math.floor(Math.random() * 1000000)}`;
    setOrderId(generatedOrderId);
  }, []);


  return (
    <div className="max-md:pr-5 h-screen"> {/* Full page height */}
      <Header text="Order" />
      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-4 w-full h-auto">
        <div className="flex flex-col h-full">
          <MenuCategories orderId={orderId} />
          {/* Reduced the left and right padding in the background even more */}
          <div className="flex-1 overflow-y-auto bg-white px-0 pt-2 pb-1 mt-2 rounded-3xl flex items-center justify-center"> 
            <ProductGrid orderId={orderId} />
          </div>
        </div>

        <div className="flex flex-col h-full">
          <OrderSummary orderId = {orderId} />
        </div>
      </div>
    </div>
  );
}

export default OrderPage;