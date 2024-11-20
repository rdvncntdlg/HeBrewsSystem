import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductGrid({ orderId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch('http://localhost:3000/api/list-products-branch/available/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-6 max-w-full lg:max-w-[100%] gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
        {products.map((product) => (
          <ProductCard 
            key={product.menu_id} // Assuming 'id' is a unique identifier
            productId={product.menu_id}
            image={product.imageurl 
              ? `http://localhost:3000/${product.imageurl}` 
              : 'http://localhost:3000/uploads/product/logo-product-default.jpg'} // Corrected default image URL
            name={product.itemname}
            price={product.price}
            addIcon={product.add_icon_url}
            orderId={orderId} // Passing orderId to each ProductCard
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
