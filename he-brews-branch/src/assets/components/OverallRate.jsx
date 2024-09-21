import React from 'react';

function OverallRate() {
  return (
    <div className="flex gap-3 mt-28 max-w-full font-bold text-black w-[300px] max-md:mt-10">
      <div className="grow my-auto text-2xl">Overall Rate: </div>
      <div className="flex text-3xl whitespace-nowrap">
        <div className="grow self-end mt-6">4.4</div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b49984df35337f95415e4e3de0652f33700722e3ec94ff9ae004239869d24372?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e" alt="Rating stars" className="object-contain shrink-0 aspect-square w-[78px]" />
      </div>
    </div>
  );
}

export default OverallRate;