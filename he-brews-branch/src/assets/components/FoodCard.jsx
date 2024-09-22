import React from 'react';

const FoodCard = ({ image, name, price, sizes }) => {
  return (
    <div className="flex relative flex-col grow justify-center p-1 w-full font-semibold bg-black bg-opacity-0">
      <div className="flex flex-col items-center px-3 py-5 w-full bg-white rounded-xl">
        <img loading="lazy" src={image} className="object-contain max-w-full aspect-square rounded-[60px] w-[123px]" alt={name} />
        <div className="mt-6 text-lg text-neutral-700">{name}</div>
        <div className="mt-4 text-base text-neutral-600">${price.toFixed(2)}</div>
        <div className="flex gap-2 self-stretch mt-7 whitespace-nowrap">
          {sizes && (
            <div className="flex flex-col flex-1 justify-center p-1.5 text-sm text-center bg-black bg-opacity-0">
              <div className="flex gap-5 justify-between items-center px-4 py-3 rounded-md bg-slate-100">
                {['S', 'M', 'L'].map((size) => (
                  <div key={size} className="self-stretch my-auto text-xs text-stone-300">{size}</div>
                ))}
              </div>
            </div>
          )}
          <button className="flex flex-col flex-1 justify-center px-1.5 py-1 text-xs text-rose-300 bg-white rounded-lg border border-rose-300 border-solid">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;