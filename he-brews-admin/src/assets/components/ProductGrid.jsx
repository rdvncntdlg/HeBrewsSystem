import React from 'react';
import ProductCard from './ProductCard';

// Sample products data
const products = [
  { name: "AMERICANO", price: "109.00", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b05cd96dc1dc372b64ad38fb14cd7de24f8ed29f02532c7f4ce3ab922a4e864?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", category: "HOT DRINKS" },
  { name: "CAPPUCCINO", price: "119.00", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e4a530d9c51a0533a4f80320f352d224ee90f7ca896440e99678ccf3e22a33f1?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", category: "HOT DRINKS" },
  { name: "CAFE LATTE", price: "119.00", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/aac6e7a6a6b198507b5600b4808f966b1b8353e278cf718001d54a596cbe0241?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", category: "HOT DRINKS" },
  { name: "MATCHA", price: "129.00", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/c9695130075a708c7d6144488d00eafb9ac477343a7ade676c5a9922409d19e3?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", category: "HOT DRINKS" },
  { name: "HOT CHOCOLATE", price: "119.00", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/d644d08ce5a832f7379132e88fc04dbc552e666ea2b09625bea241f107ff5975?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", category: "HOT DRINKS" },
  { name: "SALTED CARAMEL", price: "129.00", image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e2df60b9cb13c0f044060f16c8d8fedd1f172fbc6838cf05107cd98ae6d485a3?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e", category: "HOT DRINKS" }
];

function ProductGrid({ selectedCategory }) {
  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="flex flex-col mt-2 mx-6 max-w-full lg:max-w-[100%] gap-5">
      <div className="shrink-0 self-center max-w-full h-px border border-black border-solid w-full lg:w-[762px]" />
      <div className="mt-16 max-md:mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
