import React, { useState } from 'react';
import CategoryList from './CategoryList';
import ProductGrid from './AvailableProductGrid';

function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <CategoryList onFilter={handleFilter} />
      <ProductGrid selectedCategory={selectedCategory} />
    </div>
  );
}

export default ProductPage;
