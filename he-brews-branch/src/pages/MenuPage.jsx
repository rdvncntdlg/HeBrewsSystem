import React, { useState } from 'react';
import Header from '../assets/components/Header';
import SearchBar from '../assets/components/SearchBar';
import CategoryList from '../assets/components/CategoryList';
import AvailableProductGrid from '../assets/components/AvailableProductGrid';
import UnavailableProductGrid from '../assets/components/UnavailableProductGrid';

function Menu() {
  const [filter, setFilter] = useState('available'); // Filter state: 'available' or 'unavailable'
  const [selectedCategory, setSelectedCategory] = useState(null); // Store selected category

  // Handle filter change (Available/Unavailable)
  const handleFilterChange = (filterOption) => {
    setFilter(filterOption);
  };

  // Handle category filter change
  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId); // Set the selected category ID
  };

  return (
    <div className="overflow-hidden max-md:pr-5">
      <Header text="Menu" />
      <div className="flex justify-end mt-8 mb-4">
        <SearchBar />
      </div>
      <div className="flex flex-col items-start gap-4"> {/* Align items to the left */}
        <CategoryList onFilter={handleCategoryFilter} /> {/* Pass handleCategoryFilter to CategoryList */}
        {/* Filter buttons aligned to the left */}
        <div className="flex justify-start w-full px-6">
          <button
            onClick={() => handleFilterChange('available')}
            className={`text-base font-medium py-2 px-4 rounded-2xl ${
              filter === 'available' ? 'bg-custom-black text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Available
          </button>
          <button
            onClick={() => handleFilterChange('unavailable')}
            className={`text-base font-medium py-2 px-4 rounded-2xl ml-4 ${
              filter === 'unavailable' ? 'bg-custom-black text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Unavailable
          </button>
        </div>
        {/* Grid content should start from the left */}
        <div className="w-full mt-5">
          {filter === 'available' ? <AvailableProductGrid selectedCategory={selectedCategory} /> : <UnavailableProductGrid selectedCategory={selectedCategory} />}
        </div>
      </div>
    </div>
  );
}

export default Menu;
