import React, { useState } from 'react';
import Header from '../assets/components/Header';
import SearchBar from '../assets/components/SearchBar';
import CategoryList from '../assets/components/CategoryList';
import ProductGrid from '../assets/components/ProductGrid';
import MenuModal from '../assets/components/MenuModal';

function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="overflow-hidden max-md:pr-5">
      <Header text="Menu" />
      <div className='flex justify-end mt-8 mb-4'>
        <SearchBar />
      </div>
      <div className="flex justify-end">
        <button onClick={openModal} className="text-base font-medium text-white bg-custom-brown py-2 px-4 rounded-2xl">
          + Add Product
        </button>
        
      </div>
      <div className="grid place-items-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <CategoryList />
          <ProductGrid />
        </div>
      </div>
      <MenuModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
    

  )
};

export default Menu;