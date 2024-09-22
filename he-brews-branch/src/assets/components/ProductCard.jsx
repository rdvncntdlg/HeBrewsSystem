import React, { useState } from 'react';

function ProductCard({ id, name, price, image, category, onDelete }) {
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

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete the product "${name}"?`);

    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log(`Product with ID ${id} deleted successfully`);
          onDelete(id); // Call the parent component's delete function to update the UI
        } else {
          console.error('Failed to delete the product');
        }
      } catch (error) {
        console.error('Error deleting the product:', error);
      }
    }
  };

  return (
    <div className="flex flex-col w-[188px] pb-3.5 mx-auto font-bold bg-white rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:mt-10 relative">
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        aria-label="Delete product"
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 z-20"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/458/458594.png" // X icon
          alt="Delete"
          className="w-4 h-4"
        />
      </button>

      <img
        loading="lazy"
        src={image}
        alt={name}
        className="object-contain z-10 rounded-3xl aspect-[1.2] w-[188px]"
      />
      <div className="flex gap-5 justify-between self-center mt-3.5 max-w-full w-[155px]">
        <div className="flex flex-col">
          <div className="text-base text-black">{name}</div>
          <div className="z-10 self-start text-sm text-red-700">₱ {price}</div>
        </div>
        <button
          onClick={handleOpenModal}
          aria-label="Edit product"
          className="text-gray-500 hover:text-gray-700"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f2d4d489b32bece0970f68b2a0867dfbb0d020a8e56bae572e5ada61bf53574?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
            alt="Edit"
            className="object-contain shrink-0 my-auto w-5 aspect-square"
          />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
