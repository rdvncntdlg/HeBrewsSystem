import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function UnavailableProductGrid({ selectedCategory }) {
  const [products, setProducts] = useState([]);

  // Fetch products from the server when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch('https://hebrewssystem.onrender.com/api/list-products-branch/unavailable/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });

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
  }); // Added empty dependency array to fetch only on mount

  const handleStatusChange = (id, status) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.menu_id === id ? { ...product, available: status } : product
      )
    );
  };

  // Sort products by menu_id before filtering
  const sortedProducts = [...products].sort((a, b) => a.menu_id - b.menu_id);

  // Filter products based on the selected category (compare with category_id)
  const filteredProducts = selectedCategory
    ? sortedProducts.filter((product) => product.category_id === selectedCategory)
    : sortedProducts;

  return (
    <div className="mx-6 max-w-full lg:max-w-[100%] gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.menu_id} // Ensure this is unique and consistent for each product
            id={product.menu_id}  // Use `menu_id` as the product ID
            name={product.itemname} // Use `itemname` as the product name
            price={product.price} // Use `price` as the product price
            image={product.imageurl 
              ? `https://hebrewssystem.onrender.com/${product.imageurl}` 
              : 'https://hebrewssystem.onrender.com/uploads/product/logo-product-default.jpg'} // Corrected default image URL
            category={product.category_id}  // Pass category_id if needed for filtering
            available={product.available}
            onStatusChange={handleStatusChange} // Pass the status change handler to the product card
          />
        ))}
      </div>
    </div>
  );
}

export default UnavailableProductGrid;
