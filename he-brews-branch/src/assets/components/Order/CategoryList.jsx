import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot, faAppleAlt, faPizzaSlice, faDrumstickBite } from '@fortawesome/free-solid-svg-icons';

function CategoryList({ onFilter }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Map icon names to Font Awesome icons
  const iconMap = {
    faMugHot: faMugHot,
    faAppleAlt: faAppleAlt,
    faPizzaSlice: faPizzaSlice,
    faDrumstickBite: faDrumstickBite,
  };

  // Fetch categories from the database when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://hebrewscafeserver.onrender.com/api/categories');
        const data = await response.json();
        setCategories(data); // Set the categories from the API response
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (category) => {
    setSelectedCategory(category.categoryname); // Update to use category categoryname
    onFilter(category.category_id); // Call the filtering function passed as a prop
  };

  return (
    <nav className="flex items-center text-xl font-bold text-black overflow-x-auto scrollbar-hide">
      <ul className="flex items-center gap-4 m-4">
        {categories.map((category, index) => (
          <li key={index} className="flex-shrink-0">
            <button
              onClick={() => handleClick(category)}
              className={`w-24 h-24 p-2 border rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer transition-all transform hover:scale-105 ${
                selectedCategory === category.categoryname
                  ? 'bg-custom-black text-custom-brown border-none shadow-lg'
                  : 'bg-white border-gray-200 text-custom-black'
              }`}
            >
              {category.iconurl && (
                <FontAwesomeIcon
                  icon={iconMap[category.iconurl]} // Use mapped icon or fallback
                  className="text-3xl mb-1" // Adjust icon size and spacing
                />
              )}
              <span
                className={`text-xs text-center ${
                  selectedCategory === category.categoryname ? 'font-bold' : ''
                }`}
              >
                {category.categoryname}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryList;
