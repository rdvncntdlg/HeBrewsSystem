import React from 'react';

function ProductCard({ image, name, price, addIcon }) {
  return (
    <div className="flex flex-col max-w-full font-bold rounded-none h-[178px] w-[140px] m-2">
      <div className="flex flex-col pb-3.5 w-full bg-white rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <img loading="lazy" src={image} alt={name} className="object-contain w-full rounded-3xl aspect-[1.13]" />
        <div className="flex gap-1.5 mt-4 ml-2.5 max-md:mr-2.5">
          <div className="flex flex-col">
            <div className="text-base text-black">{name}</div>
            <div className="self-start mt-1.5 text-sm text-red-700">{price}</div>
          </div>
          <img loading="lazy" src={addIcon} alt="Add to cart" className="object-contain shrink-0 self-start w-6 aspect-square" />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;