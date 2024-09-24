import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/b9278d90075d5d9888210215a9a6631a1757c82a9d1fa4c58f79183466abc839?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e",
    name: "Americano",
    price: "₱ 109.00",
    addIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9876f319047d9646ae1d08d02f92e332282304eadf361cd27db1561cbbca58e6?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
  },
  {
    id: 2,
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/b9278d90075d5d9888210215a9a6631a1757c82a9d1fa4c58f79183466abc839?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e",
    name: "Latte",
    price: "₱ 120.00",
    addIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/48854a3c21723d80e375db47f57dfb00bcef35ee285023a8d80ae57d79212fbf?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
  },
  {
    id: 3,
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a780ba333d6dd105027fdfc2a8cf76e11abf87946794a06cf2a9ccbe4ca7d47?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e",
    name: "Cappuccino",
    price: "₱ 130.00",
    addIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dc45310bf2b36a849d764f85af8b0c5e4a991194a640b259e59fa26f73ea5682?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
  },
  {
    id: 4,
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a780ba333d6dd105027fdfc2a8cf76e11abf87946794a06cf2a9ccbe4ca7d47?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e",
    name: "Mocha",
    price: "₱ 140.00",
    addIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b212e6321d669e7120e8209e6bc32a503f4fdf95e3c3e066069da2cd65a4dee?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
  },
  {
    id: 5,
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a780ba333d6dd105027fdfc2a8cf76e11abf87946794a06cf2a9ccbe4ca7d47?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e",
    name: "Espresso",
    price: "₱ 99.00",
    addIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dc45310bf2b36a849d764f85af8b0c5e4a991194a640b259e59fa26f73ea5682?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
  },
  {
    id: 6,
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a780ba333d6dd105027fdfc2a8cf76e11abf87946794a06cf2a9ccbe4ca7d47?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e",
    name: "Macchiato",
    price: "₱ 125.00",
    addIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b212e6321d669e7120e8209e6bc32a503f4fdf95e3c3e066069da2cd65a4dee?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
  }
];

function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          image={product.image} 
          name={product.name} 
          price={product.price} 
          addIcon={product.addIcon} 
        />
      ))}
    </div>
  );
}

export default ProductGrid;
