import React from 'react';

function FeedbackItem({ title, bgColor }) {
  return (
    <div className={`grow px-10 py-14 w-full ${bgColor} max-md:px-5`}>
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="text-2xl font-bold text-black max-md:mt-10">{title}</div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d50538a34f3d2b822da0c13b5b2a0ca56c8401eb2181ff1c0badeb80f2509b9?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e" alt="Rating" className="object-contain shrink-0 self-stretch my-auto max-w-full aspect-[6.45] w-[142px] max-md:mt-10" />
        </div>
      </div>
    </div>
  );
}

export default FeedbackItem;