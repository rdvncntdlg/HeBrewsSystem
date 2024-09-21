import React, { useState, useEffect } from 'react';

function CategoryList({ onFilter }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories from the database when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories');
        const data = await response.json();
        setCategories(data); // Set the categories from the API response
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (category) => {
    setSelectedCategory(category.name);  // Update to use category name
    onFilter(category.name);  // Call the filtering function passed as a prop
  };

  return (
    <nav className="flex items-center mt-1 h-16 text-2xl font-bold text-black overflow-x-auto">
      <ul className="flex items-center gap-2">
        {categories.map((category, index) => (
          <li key={index} className="inline">
            <button
              onClick={() => handleClick(category)}
              className={`text-base text-zinc-600 bg-transparent border-none cursor-pointer focus:outline-none w-32 h-12 flex items-center justify-center ${selectedCategory === category.name ? 'font-bold' : ''}`}
            >
              {category.name}
              {category.image_path && (
                <img
                  loading="lazy"
                  src={`http://localhost:3000/${category.image_path}`}  // Adjust the image path as necessary
                  alt={category.name}
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
