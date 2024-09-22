import React from 'react';

function OrderItem({ image, name, price }) {
  return (
    <div className="flex relative flex-col justify-center items-start py-1 bg-black bg-opacity-0 mb-4">
      <div className="flex z-0 self-stretch w-full rounded-xl bg-slate-100 min-h-[86px]" />
      <button className="absolute z-0 text-xs text-rose-300 bottom-[25px] h-[13px] right-[19px] w-[47px]">Remove</button>
      <div className="absolute z-0 h-4 text-base bottom-[27px] right-[215px] text-neutral-500 w-[53px]">{price}</div>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/212385d6a181246c51560411f3057ff377b0fb5be39595870803572ed91e88ff?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e" alt="Quantity controls" className="object-contain absolute z-0 aspect-[2.87] bottom-[45px] h-[29px] right-[13px] w-[83px]" />
      <div className="absolute z-0 text-sm bottom-[51px] h-[17px] right-[145px] text-zinc-700 w-[123px]">{name}</div>
      <img loading="lazy" src={image} alt={name} className="object-contain absolute z-0 aspect-[1.35] bottom-[25px] h-[43px] right-[279px] w-[58px]" />
    </div>
  );
}

export default OrderItem;