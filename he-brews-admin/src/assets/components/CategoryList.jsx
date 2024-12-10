import React, { useState, useEffect } from 'react';

function CategoryList({ onFilter }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Fetch categories from the database when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://hebrewscafeserver.onrender.com/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category click
  const handleClick = (category) => {
    setSelectedCategoryId(category.category_id);
    onFilter(category.category_id); // Use category_id for filtering
  };

  return (
    <nav className="flex items-center mt-1 h-16 text-2xl font-bold text-black overflow-x-auto">
      <ul className="flex items-center gap-2">
        {categories.map((category, index) => (
          <li key={index} className="inline">
            <button
              onClick={() => handleClick(category)}
              className={`text-base text-zinc-600 bg-transparent border-none cursor-pointer focus:outline-none w-32 h-12 flex items-center justify-center ${selectedCategoryId === category.category_id ? 'font-bold' : ''}`}
            >
              {category.categoryname}
              {category.image_path && (
                <img
                  loading="lazy"
                  src={`https://hebrewscafeserver.onrender.com/${category.image_path}`}
                  alt={category.categoryname}
                  className="object-contain inline-block z-0 shrink-0 w-3 h-3 aspect-square"
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
