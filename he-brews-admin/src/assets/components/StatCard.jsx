import React from 'react';

function StatCard({ icon, value, change, label, changeIcon }) {
  return (

    <div className="flex flex-col w-[25%] max-md:w-full overflow-hidden ">
  <div className="flex flex-row p-6 mx-auto w-full font-bold bg-white shadow rounded-[30px] max-md:px-5 max-md:mt-6 items-center">
    <div className="relative size-20 flex items-center justify-center bg-custom-brown rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center object-cover">
        {icon}
      </div>
    </div>
    <div className="flex flex-col ml-4 max-md:ml-2">
      <div className="text-black text-sm">{label}</div>
      <div className="flex flex-row text-4xl max-md:text-3xl items-center">
        {value}
        <div className="text-sm text-green-600 ml-2">{change}</div>
      </div>
    </div>
  </div>
</div>


  );
}

export default StatCard;