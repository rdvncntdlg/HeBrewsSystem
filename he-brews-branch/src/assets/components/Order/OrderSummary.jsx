import React from 'react';
import OrderItem from './OrderItem';
import PaymentMethod from './PaymentMethod';

const orderItems = [
  { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/977b1e6874b800ac985f8ef51940aa309cd2db71b2213ff68cf32ec46df55700?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", name: "Chicken Whooper", price: "$14.00" },
  // Add more items as needed
];

function OrderSummary() {
  return (
    <section className="flex flex-col w-full max-md:w-full">
      <div className="flex grow max-md:mt-8">
        <div className="flex flex-col grow shrink-0 py-5 bg-white rounded-3xl w-full">
          <div className="flex justify-between gap-4 px-4">
            <div className="text-lg font-bold text-black">Order # 00001</div>
            <div className="text-base font-semibold text-zinc-400">Sunday, 22 Sept. 2024</div>
          </div>
          <div className="flex flex-col px-4 py-4 mt-6 font-semibold bg-white border-t border-b border-zinc-400">
            {orderItems.map((item, index) => (
              <OrderItem key={index} {...item} />
            ))}
          </div>
          <div className="flex flex-col px-4 pt-3 pb-6 font-semibold bg-black bg-opacity-0">
            <div className="flex justify-between items-start gap-5">
              <div className="flex flex-col text-xs">
                <div className="text-neutral-500">Sub Total</div>
                <div className="mt-5 text-neutral-500">Tax 10% ( VAT Included)</div>
              </div>
              <div className="flex flex-col mt-1 text-sm whitespace-nowrap">
                <div className="text-zinc-700">$50.00</div>
                <div className="mt-4 text-neutral-700">$5.00</div>
              </div>
            </div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d9b36ad2a474d601bc876e7aee89dff0a88a0688e5c73229a757d234f4c98d4?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e" alt="" className="object-contain mt-5 w-full aspect-[166.67]" />
            <div className="flex justify-between mt-3">
              <div className="text-sm text-stone-700">Total</div>
              <div className="text-sm text-lime-500">$55.00</div>
            </div>
          </div>
          <PaymentMethod />
          <button className="self-center px-8 py-4 mt-4 text-base font-semibold text-orange-200 bg-stone-700 rounded-3xl w-full max-w-[314px]">
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
}

export default OrderSummary;
