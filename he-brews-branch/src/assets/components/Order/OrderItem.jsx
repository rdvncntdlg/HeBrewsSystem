import React, { useState } from 'react';

function OrderItem({ image, name, price }) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex relative flex-col justify-center items-start py-1 bg-black bg-opacity-0 mb-4">
      <div className="flex z-0 self-stretch w-full rounded-xl bg-slate-100 min-h-[86px]" />
      <button 
        className="absolute z-0 text-xs text-rose-300 bottom-[25px] h-[13px] right-[19px]" 
        onClick={() => {/* Handle remove item from order logic */}}>
        Remove
      </button>
      <div className="absolute z-0 h-4 text-base bottom-[27px] right-[215px] text-neutral-500 w-[53px]">
        ${(parseFloat(price.slice(1)) * quantity).toFixed(2)} {/* Total price */}
      </div>
      <div className="absolute z-0 flex items-center bottom-[45px] right-[13px]">
        <button 
          onClick={handleRemove} 
          className="w-6 h-6 bg-green-800 text-white rounded-full flex items-center justify-center">
          −
        </button>
        <div className="text-base text-neutral-500 w-10 text-center">{quantity}</div>
        <button 
          onClick={handleAdd} 
          className="w-6 h-6 bg-green-800 text-white rounded-full flex items-center justify-center">
          +
        </button>
      </div>
      <div className="absolute z-0 text-sm bottom-[51px] h-[17px] right-[145px] text-zinc-700 w-[123px]">{name}</div>
      <img loading="lazy" src={image} alt={name} className="object-contain absolute z-0 aspect-[1.35] bottom-[25px] h-[43px] right-[279px] w-[58px]" />
    </div>
  );
}

export default OrderItem;
