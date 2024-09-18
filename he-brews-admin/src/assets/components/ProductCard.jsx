import React from 'react';

function ProductCard({ name, price, image }) {
  return (
    <div className="flex flex-col w-[188px] pb-3.5 mx-auto font-bold bg-white rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:mt-10">
      <img loading="lazy" src={image} alt={name} className="object-contain z-10 rounded-3xl aspect-[1.2] w-[188px]" />
      <div className="flex gap-5 justify-between self-center mt-3.5 max-w-full w-[155px]">
        <div className="flex flex-col">
          <div className="text-base text-black">{name}</div>
          <div className="z-10 self-start text-sm text-red-700">₱ {price}</div>
        </div>
        <button aria-label="Edit product">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f2d4d489b32bece0970f68b2a0867dfbb0d020a8e56bae572e5ada61bf53574?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e" alt="" className="object-contain shrink-0 my-auto w-5 aspect-square" />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;