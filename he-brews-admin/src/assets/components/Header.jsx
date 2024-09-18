import { MoreVertical } from 'lucide-react';
import React from 'react';


function Header({text}) {
  return (
    <header className="flex flex-wrap gap-5 justify-between text-black max-md:mr-2.5 max-md:max-w-full">
      <h1 className="my-auto text-4xl font-bold">{text}</h1>
      <div className="flex gap-2 text-right items-center">
        <div className="flex flex-col my-auto">
          <div className="text-base font-bold">Candor, Valerie Myca L.</div>
          <div className="self-end text-sm max-md:mr-0.5">Administrator</div>
        </div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/734201e55d4fb723c84ea91e8101c53f5dea06defe30783025a534621eabbcb6?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e" alt="Administrator profile" className="object-contain shrink-0 rounded-full aspect-square w-[50px]" />
        <MoreVertical size={20} className="cursor-pointer " />
      </div>
    </header>
  );
}

export default Header;