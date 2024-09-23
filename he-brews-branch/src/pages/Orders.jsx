import React from 'react';
import Header from '../assets/components/Header';
import MenuCategories from '../assets/components/Order/MenuCategories';
import ProductGrid from '../assets/components/Order/ProductGrid';
import OrderSummary from '../assets/components/Order/OrderSummary';

function OrderPage() {
  return (
    <div className="max-md:pr-5">
      <Header text="Order" />
      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-4 w-full">
        {/* First section: MenuCategories and ProductGrid (65%) */}
        <div className="flex flex-col h-full">
          <MenuCategories />
          <div className="flex-1 overflow-y-auto">
            <ProductGrid />
          </div>
        </div>

        {/* Second section: OrderSummary (35%) */}
        <div className="flex flex-col h-full">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
