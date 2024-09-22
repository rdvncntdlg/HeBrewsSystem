import React from 'react';

const OrderItem = ({ image, name, price, quantity }) => {
  return (
    <div className="flex relative flex-col justify-center px-1 py-1.5 mt-5 max-w-full bg-black bg-opacity-0 w-[322px]">
      <div className="flex gap-2.5 items-start px-3.5 py-5 rounded-xl bg-slate-100">
        <img loading="lazy" src={image} className="object-contain shrink-0 mt-1.5 aspect-[1.35] w-[58px]" alt={name} />
        <div className="flex flex-col self-stretch my-auto">
          <div className="text-sm text-zinc-700">{name}</div>
          <div className="self-start mt-2.5 text-base font-semibold text-neutral-500">${price.toFixed(2)}</div>
        </div>
        {quantity && (
          <div className="flex flex-col text-xs font-semibold text-rose-300 whitespace-nowrap">
            <div className="flex items-start text-xs text-center text-neutral-600">
              <button aria-label="Decrease quantity" className="object-contain shrink-0 aspect-[0.96] w-[25px]">-</button>
              <div className="flex relative flex-col self-stretch px-2.5 py-2 w-7 aspect-square">
                <span>{quantity}</span>
              </div>
              <button aria-label="Increase quantity" className="object-contain shrink-0 aspect-[1.04] w-[26px]">+</button>
            </div>
            <button className="self-end mt-2.5">Remove</button>
          </div>
        )}
        {!quantity && (
          <div className="flex flex-col text-xs font-semibold text-rose-300 whitespace-nowrap">
            <img loading="lazy" src="http://b.io/ext_35-" className="object-contain aspect-[2.87] w-[83px]" alt="Quantity control" />
            <button className="self-end mt-2.5">Remove</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItem;