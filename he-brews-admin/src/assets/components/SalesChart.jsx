import React from 'react';

function SalesChart() {
  return (
    <section className="flex relative flex-col self-end px-2.5 pb-80 mt-14 max-w-full text-2xl font-bold whitespace-nowrap min-h-[413px] rounded-[36px] w-[100%] max-md:pr-5 max-md:pb-28 max-md:mt-10">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/39365c2cc4b34caa963747e954c5031b7f53a8ffa382ccdd71269a4dc4aacae4?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e" alt="Sales chart" className="object-cover absolute inset-0 size-full" />
      <h2>Sales</h2>
    </section>
  );
}

export default SalesChart;