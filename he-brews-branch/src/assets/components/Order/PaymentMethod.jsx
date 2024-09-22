import React from 'react';

function PaymentMethod() {
  return (
    <div className="flex flex-col items-start py-2 pr-16 pl-3.5 mr-4 ml-4 font-semibold bg-black bg-opacity-0 max-md:pr-5 max-md:mx-2.5">
      <div className="ml-2.5 text-base text-neutral-700">Payment Method</div>
      <div className="flex mt-3 text-xs text-center whitespace-nowrap">
        <div className="flex flex-col px-2.5 py-1.5 bg-black bg-opacity-0 text-zinc-500">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd3d7fa99dd852be0d570d6185ed9cbca3e0f5afaaabd1236583579c3b93305f?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e" alt="Cash payment option" className="object-contain rounded-2xl aspect-[1.36] w-[94px]" />
          <div className="self-start mt-2.5">Cash</div>
        </div>
        <div className="flex flex-col px-3 py-1.5 bg-black bg-opacity-0 text-zinc-600">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/13b575dfe20f278fff20085515c5e41777319a54545847753bda12379b33ebaf?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e" alt="GCash payment option" className="object-contain w-24 rounded-3xl aspect-[1.37]" />
          <div className="self-start mt-2">GCash</div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;