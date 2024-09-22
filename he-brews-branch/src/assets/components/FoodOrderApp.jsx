import React from 'react';
import CategoryButton from './CategoryButton';
import FoodCard from './FoodCard';
import FoodOrderItem from './FoodOrderItem';
import PaymentMethod from './PaymentMethod';

const FoodOrderApp = () => {
  const categories = [
    { icon: "http://b.io/ext_36-", label: "All Items", isActive: true },
    { icon: "http://b.io/ext_37-", label: "Pizza", isActive: false },
    { icon: "http://b.io/ext_38-", label: "Burger", isActive: false },
    { icon: "http://b.io/ext_39-", label: "Rice", isActive: false },
    { icon: "http://b.io/ext_40-", label: "Dessert", isActive: false },
  ];

  const foodItems = [
    { image: "http://b.io/ext_41-", name: "Farm Villa", price: 8.00 },
    { image: "http://b.io/ext_42-", name: "Tandoori Paneer", price: 10.00 },
    { image: "http://b.io/ext_43-", name: "Cheezy - 7", price: 19.00 },
    { image: "http://b.io/ext_44-", name: "Margherita", price: 12.00 },
    { image: "http://b.io/ext_45-", name: "Sweet Corn", price: 13.00 },
    { image: "http://b.io/ext_46-", name: "Chicken Pizza", price: 22.00 },
  ];

  const orderItems = [
    { image: "http://b.io/ext_47-", name: "Chicken Whooper", price: 14.00 },
    { image: "http://b.io/ext_48-", name: "Cup Cake", price: 12.00 },
    { image: "http://b.io/ext_49-", name: "Farm Villa", price: 16.00, quantity: 2 },
  ];

  const paymentMethods = [
    { image: "http://b.io/ext_50-", label: "Cash", isActive: false },
    { image: "http://b.io/ext_51-", label: "Debit Card", isActive: true },
    { image: "http://b.io/ext_52-", label: "E-Wallet", isActive: false },
  ];

  return (
    <div className="flex overflow-hidden flex-col bg-black bg-opacity-0">
      <div className="flex flex-col w-full bg-black bg-opacity-0 max-md:max-w-full">
        <div className="px-0.5 pb-6 w-full max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full">
              <div className="flex relative flex-col grow min-h-[800px] max-md:mt-2.5 max-md:max-w-full">
                <img loading="lazy" src="http://b.io/ext_53-" className="object-cover absolute inset-0 size-full" alt="Background" />
                <div className="flex relative flex-col justify-center px-5 py-px font-semibold bg-black bg-opacity-0 max-md:max-w-full">
                  <div className="flex flex-col py-4 pl-5 w-full bg-white rounded-none max-md:max-w-full">
                    <div className="flex flex-wrap gap-5 justify-between max-w-full w-[776px]">
                      <div className="flex gap-2.5 self-start">
                        <div className="grow text-base text-neutral-700">Choose Category</div>
                        <div className="my-auto text-xs text-red-300">42+ Category</div>
                      </div>
                      <div className="text-xs text-neutral-500">View All</div>
                    </div>
                    <div className="flex gap-2 mt-4 w-full text-xs max-md:mr-0 max-md:max-w-full">
                      {categories.map((category, index) => (
                        <CategoryButton key={index} {...category} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex relative z-10 flex-col pt-0.5 pb-3.5 ml-3 bg-black bg-opacity-0 max-md:-mr-1.5 max-md:max-w-full">
                  <div className="flex relative flex-col py-4 pr-1.5 pl-6 w-full min-h-[663px] max-md:pl-5 max-md:max-w-full">
                    <img loading="lazy" src="http://b.io/ext_54-" className="object-cover absolute inset-0 size-full" alt="Food background" />
                    <div className="relative max-md:max-w-full">
                      <div className="flex flex-wrap gap-5">
                        {foodItems.map((item, index) => (
                          <div key={index} className="w-[33%] max-md:w-full">
                            <FoodCard {...item} sizes={true} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[30%] max-md:ml-0 max-md:w-full">
              <div className="flex relative flex-col py-1 pr-2.5 pl-1 w-full aspect-[0.475] max-md:mt-2.5">
                <img loading="lazy" src="http://b.io/ext_55-" className="object-cover absolute inset-0 size-full" alt="Order background" />
                <div className="flex relative flex-col pt-2.5 pb-px w-full font-semibold bg-white">
                  <div className="flex gap-5 justify-between self-center max-w-full w-[302px]">
                    <div className="text-base text-neutral-600">New Order Bill</div>
                    <div className="text-xs text-stone-300">Sunday, 28 Oct, 2021</div>
                  </div>
                  <img loading="lazy" src="http://b.io/ext_56-" className="object-contain mt-5 w-full aspect-[166.67]" alt="Divider" />
                </div>
                {orderItems.map((item, index) => (
                  <FoodOrderItem key={index} {...item} />
                ))}
                <div className="flex relative z-10 mt-2.5 font-semibold">
                  <img loading="lazy" src="http://b.io/ext_57-" className="object-contain flex-1 grow shrink-0 self-end mt-36 mr-0 aspect-[166.67] basis-0 w-fit max-md:mt-10" alt="Divider" />
                  <div className="flex flex-col grow shrink-0 px-4 pt-3.5 pb-7 basis-0 bg-black bg-opacity-0 w-fit max-md:pr-5">
                    <div className="flex gap-5 justify-between items-start max-md:mr-0.5">
                      <div className="flex flex-col text-xs">
                        <div className="self-start text-neutral-500">Sub Total</div>
                        <div className="mt-5 text-neutral-500">Tax 10% ( VAT Included)</div>
                      </div>
                      <div className="flex flex-col text-sm whitespace-nowrap">
                        <div className="text-zinc-700 max-md:mr-0.5">$50.00</div>
                        <div className="self-start mt-4 ml-2.5 text-neutral-700">$5.00</div>
                      </div>
                    </div>
                    <img loading="lazy" src="http://b.io/ext_58-" className="object-contain mt-5 w-full aspect-[166.67]" alt="Divider" />
                    <div className="flex gap-5 justify-between mt-3.5 whitespace-nowrap max-md:mr-1">
                      <div className="text-sm text-rose-400">Total</div>
                      <div className="text-sm text-lime-500">$55.00</div>
                    </div>
                  </div>
                </div>
                <div className="flex relative flex-col py-4 mt-0 font-semibold rounded-none aspect-[1.397]">
                  <img loading="lazy" src="http://b.io/ext_59-" className="object-cover absolute inset-0 size-full" alt="Payment background" />
                  <div className="flex relative flex-col px-3.5 py-2 w-full bg-black bg-opacity-0 max-md:-mr-0.5">
                    <div className="self-start ml-2.5 text-base text-neutral-700">Payment Method</div>
                    <div className="flex mt-3 text-xs">
                      {paymentMethods.map((method, index) => (
                        <PaymentMethod key={index} {...method} />
                      ))}
                    </div>
                  </div>
                  <div className="flex relative flex-col justify-center self-center p-1 mt-5 max-w-full text-base text-red-200 bg-black bg-opacity-0 w-[314px]">
                    <button className="px-16 py-4 bg-red-400 rounded max-md:px-5">
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodOrderApp;