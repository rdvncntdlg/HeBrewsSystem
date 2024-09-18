import React, { useState } from 'react';

const categories = [
  "HOT DRINKS", "ICED DRINKS", "BLENDED COFFEE", "MILK SHAKES",
  "FRUIT SLUSH", "ICED TEA", "SNACKS", "PIZZA", "SANDWICH"
];

function CategoryList({ onFilter }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClick = (category) => {
    setSelectedCategory(category);
    onFilter(category);  // Call the filtering function passed as a prop
  };

  return (
    <nav className="flex items-center mt-1 h-16 text-2xl font-bold text-black overflow-x-auto">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb8b826bd1e113ce7ca8b38e8bb71726fc55c0f3ea74c2fffb02f2c05087b34d?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
        alt=""
        className="object-contain z-0 shrink-0 self-stretch my-auto aspect-square w-[15px]"
      />
      <ul className="flex items-center gap-2">
        {categories.map((category, index) => (
          <li key={index} className="inline">
            <button
              onClick={() => handleClick(category)}
              className={`text-base text-zinc-600 bg-transparent border-none cursor-pointer focus:outline-none w-32 h-12 flex items-center justify-center ${selectedCategory === category ? 'font-bold' : ''}`}
            >
              {category}
              {index < categories.length - 1 && (
                <img
                  loading="lazy"
                  src={`http://b.io/ext_${12 + index}-`}
                  alt=""
                  className={`object-contain inline-block z-0 shrink-0 w-3 h-3 aspect-square ${index === 0 ? 'ml-[9px]' : ''}`}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryList;
