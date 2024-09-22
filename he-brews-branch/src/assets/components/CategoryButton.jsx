import React from 'react';

const CategoryButton = ({ icon, label, isActive }) => {
  const baseClasses = "flex gap-4 px-2.5 py-3 rounded-3xl";
  const activeClasses = isActive ? "bg-slate-50" : "bg-black bg-opacity-0";
  
  return (
    <div className={`flex flex-col justify-center px-2 py-1 bg-black bg-opacity-0 text-xs ${isActive ? 'text-neutral-800' : 'text-neutral-600'}`}>
      <div className={`${baseClasses} ${activeClasses}`}>
        <img loading="lazy" src={icon} className="object-contain shrink-0 aspect-square w-[29px]" alt={`${label} icon`} />
        <div className="my-auto">{label}</div>
      </div>
    </div>
  );
};

export default CategoryButton;