import React from 'react';

const OrderItem = ({ imageSrc, name, size, price }) => (
  <div className="flex items-center justify-between py-0.5 pr-6 pl-0.5 mt-3 max-w-full rounded-md border border-solid bg-zinc-100 border-zinc-100 w-full max-md:pr-5">
    <div className="flex items-center gap-7 text-xs text-stone-800 w-full">
      <div className="flex items-center gap-3 flex-grow min-w-0">
        <img loading="lazy" src={imageSrc} alt={name} className="object-contain shrink-0 aspect-[1.24] w-[46px]" />
        <div className="truncate">{name}</div>
      </div>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0141621dcd439e8ac2dd971e77ab8c9db53b78446ccb0b7624fe742125ecdd1b?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e" alt="" className="object-contain shrink-0 w-3 aspect-[1.2]" />
    </div>
    <div className="flex items-center gap-6 whitespace-nowrap">
      <div className="text-xs text-neutral-400">{size}</div>
      <div className="text-sm font-bold text-stone-800">{price}</div>
    </div>
  </div>
);

export default OrderItem;
