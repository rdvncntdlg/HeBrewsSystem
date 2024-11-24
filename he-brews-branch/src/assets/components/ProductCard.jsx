import React, { useState } from 'react';
import { Check, X } from 'lucide-react'; // Import the icons

function ProductCard({ id, name, price, image, category, available, onStatusChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (updatedProduct) => {
    // Handle save logic, e.g., send updatedProduct to the server
    console.log('Updated product:', updatedProduct);
  };

  const handleAvailable = async () => {
    try {
      const response = await fetch(`https://hebrewssystem.onrender.com/api/products/${id}/available`, {
        method: 'PUT',
      });

      if (response.ok) {
        console.log(`Product with ID ${id} is now available`);
        onStatusChange(id, true); // Call the parent component's status change function
      } else {
        console.error('Failed to set the product as available');
      }
    } catch (error) {
      console.error('Error making the product available:', error);
    }
  };

  const handleUnavailable = async () => {
    try {
      const response = await fetch(`https://hebrewssystem.onrender.com/api/products/${id}/unavailable`, {
        method: 'PUT',
      });

      if (response.ok) {
        console.log(`Product with ID ${id} is now unavailable`);
        onStatusChange(id, false); // Call the parent component's status change function
      } else {
        console.error('Failed to set the product as unavailable');
      }
    } catch (error) {
      console.error('Error making the product unavailable:', error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full mx-auto font-bold bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:mt-10 relative">
      {/* Icons container: Available (Check) and Unavailable (X) */}
      <div className="absolute top-0 right-0 flex gap-2 z-20">
        {available ? (
          // Only show the set as unavailable button (X) when available is true
          <button
            onClick={handleUnavailable}
            aria-label="Set product as unavailable"
            className="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-full border-4 border-white hover:bg-red-600 transform translate-x-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4" /> {/* X icon for unavailable */}
          </button>
        ) : (
          // Only show the set as available button (Check) when available is false
          <button
            onClick={handleAvailable}
            aria-label="Set product as available"
            className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full border-4 border-white hover:bg-green-600 transform translate-x-1/2 -translate-y-1/2"
          >
            <Check className="w-4 h-4" /> {/* Check icon for available */}
          </button>
        )}
      </div>

      {/* Flex container for image and content */}
      <div className="flex flex-col h-full">
        {/* Image takes 70% of the card's height with rounded top-left and top-right corners */}
        <div className="h-[70%]">
          <img
            loading="lazy"
            src={image}
            alt={name}
            className="object-cover w-full h-full border-t border-t-gray-300 rounded-tl-lg rounded-tr-lg"  // Added rounded top-left and top-right corners
          />
        </div>

        {/* Content section takes 30% of the card's height */}
        <div className="h-[30%] flex flex-col justify-center px-5 pt-2">
          {/* Name takes 50% and adjusts based on space */}
          <div className="h-[50%] w-full flex justify-center items-center">
            <div className="text-base md:text-sm lg:text-smx text-black text-center flex-1">{name}</div>
          </div>

          {/* Price takes 50% */}
          <div className="h-[50%] w-full flex justify-center items-center">
            <div className="text-base md:text-lg lg:text-sm text-red-700 text-center pb-2">{`₱ ${price}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
