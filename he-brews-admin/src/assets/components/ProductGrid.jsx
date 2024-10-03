import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductGrid({ selectedCategoryId }) {
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
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  // Sort products by id before filtering
  const sortedProducts = [...products].sort((a, b) => a.id - b.id);

  // Filter products based on the selected category_id
  const filteredProducts = selectedCategoryId
    ? sortedProducts.filter(product => product.category_id === selectedCategoryId)
    : sortedProducts;

  return (
    <div className="flex flex-col mt-2 mx-6 max-w-full lg:max-w-[100%] gap-5">
      <div className="shrink-0 self-center max-w-full h-px border border-black border-solid w-full lg:w-[762px]" />
      <div className="mt-16 max-md:mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
              id={product.menu_id}
              name={product.itemname}
              price={product.price}
              image={`http://localhost:3000/${product.imageurl}`}
              category={product.category_id}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
