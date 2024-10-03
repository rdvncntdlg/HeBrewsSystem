import React from 'react';

const categories = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1dc109e65d2a9ba9b79677323551ca7257cfd61a93ca1581f57772d48257db9f?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", name: "Hot Drinks", isActive: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f8e0d2f69c7ff2293507817015cebcc376c86d34e5362372ca5ad16bfba98bec?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", name: "Iced Drinks" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/789721f415ea6256ac13b804d9983c79aedc1c08d9c176daf7b6908b141e1e8b?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", name: "Blended Coffee" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/943bf49f2e3950363b7fdb5335eca886f3412be9cb3b4bed96af46367d6dea03?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", name: "Milk Shakes" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/978c06473af542b521c7e5c38c24ebda5edd416d559573599fa5ca1479847b1e?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", name: "Fruit Slush" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6f133699f0820c25bc847f8a6ab8cdd4ed9c0a0e7cd67dc18f61595250c3193f?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", name: "Iced Tea" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2025d01bd44564177f3ffd4e9d7099a35076f079cb0bcf29090cb7d4d42b99e9?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", name: "Snacks" }
];

function MenuCategories() {
  return (
    <nav className="flex z-0 flex-col justify-center items-center self-center px-8 py-6 w-full rounded-3xl bg-stone-700 max-w-[572px] min-h-[110px] max-md:px-5 max-md:max-w-full">
      <div className="flex overflow-x-auto gap-10 w-full">
        {categories.map((category, index) => (
          <div key={index} className={`flex flex-col ${category.isActive ? 'px-2.5 py-2 text-xs font-bold leading-loose text-center text-black bg-orange-200 rounded-xl' : ''}`}>
            <img loading="lazy" src={category.icon} alt="" className="object-contain aspect-square w-[30px]" />
            <div className={`${category.isActive ? 'self-start' : 'text-xs font-bold leading-loose text-center text-white'}`}>{category.categoryname}</div>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default MenuCategories;