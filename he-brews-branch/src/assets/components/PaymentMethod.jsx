import React from 'react';

const PaymentMethod = ({ image, label, isActive }) => {
  const baseClasses = "flex flex-col flex-1 px-2.5 py-2 whitespace-nowrap bg-black bg-opacity-0";
  const textClasses = isActive ? "text-zinc-600" : "text-zinc-500";

  return (
    <div className={`${baseClasses} ${textClasses}`}>
      <img loading="lazy" src={image} className="object-contain rounded-2xl aspect-[1.3] w-[90px]" alt={`${label} payment method`} />
      <div className="self-center mt-3">{label}</div>
    </div>
  );
};

export default PaymentMethod;