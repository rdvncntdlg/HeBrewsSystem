import React, { useState } from 'react';
import Header from '../assets/components/Header';
import SearchBar from '../assets/components/SearchBar';
import CategoryList from '../assets/components/CategoryList';
import ProductGrid from '../assets/components/ProductGrid';
import MenuModal from '../assets/components/MenuModal';
import CategoryModal from '../assets/components/CategoryModal';

function Menu() {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const openMenuModal = () => setIsMenuModalOpen(true);
  const closeMenuModal = () => setIsMenuModalOpen(false);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const openCategoryModal = () => setIsCategoryModalOpen(true);
  const closeCategoryModal = () => setIsCategoryModalOpen(false);

  return (
    <div className="overflow-hidden max-md:pr-5">
      <Header text="Menu" />
      <div className='flex justify-end mt-8 mb-4'>
        <SearchBar />
      </div>
      <div className="flex justify-end">
      <button onClick={openCategoryModal} className="text-base font-medium text-white bg-custom-black py-2 px-4 rounded-2xl">
          + Add Category
        </button>
        <button onClick={openMenuModal} className="text-base font-medium text-custom-black bg-custom-brown py-2 px-4 rounded-2xl">
          + Add Product
        </button>       
      </div>
      <div className="grid place-items-center h-screen">
      <CategoryList />
      
        <div className="flex flex-col items-center gap-4">
        <ProductGrid />
          
        </div>
      </div>
      <MenuModal isOpen={isMenuModalOpen} onClose={closeMenuModal} />
      <CategoryModal isOpen={isCategoryModalOpen} onClose={closeCategoryModal} />
    </div>
    

  )
};

export default Menu;