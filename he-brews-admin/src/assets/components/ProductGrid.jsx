import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductGrid({ selectedCategory }) {
  const [products, setProducts] = useState([]);

  // Fetch products from the server when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/list-products');
        if (!response.ok) {
          const text = await response.text(); // Read response as text if not OK
          console.error('Error response:', text);
          return;
        }
        const data = await response.json();
        setProducts(data); // Set products in the state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Sort products by id before filtering
  const sortedProducts = [...products].sort((a, b) => a.id - b.id);

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? sortedProducts.filter(product => product.category === selectedCategory)
    : sortedProducts;

  return (
    <div className="flex flex-col mt-2 mx-6 max-w-full lg:max-w-[100%] gap-5">
      <div className="shrink-0 self-center max-w-full h-px border border-black border-solid w-full lg:w-[762px]" />
      <div className="mt-16 max-md:mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredProducts.map((product, index) => (
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              image={`http://localhost:3000/${product.image_path}`}  // Use image_path from the database
              category={product.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
