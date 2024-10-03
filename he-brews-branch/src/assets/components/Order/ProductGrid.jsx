import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductGrid({orderId}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/menu');
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <ProductCard 
          key={product.menu_id} // Assuming 'id' is a unique identifier
          productId={product.menu_id}
          image={product.imageurl} // Make sure this matches your DB column
          name={product.itemname}
          price={product.price}
          addIcon={product.add_icon_url}
          orderId = {orderId} // Assuming addIcon is stored in DB
        />
      ))}
    </div>
  );
}

export default ProductGrid;
