import React, { useState } from 'react';
import EditBranchModal from './EditBranchModal';

function BranchCard({ id, image, name, address, icon, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = (updatedBranch) => {
    handleCloseModal();
    if (onUpdate) onUpdate(updatedBranch); // Call the parent function to refresh the data
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden w-64 h-80 gap-5">
        <img
          src={image}
          alt={`${name} branch`}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{name}</h2>
          <div className="flex justify-between items-center text-sm text-red-700">
            <p>{address}</p>
            <img
              src={icon}
              alt="Edit icon"
              className="w-6 h-6 cursor-pointer"
              onClick={handleOpenModal}
            />
          </div>
        </div>
      </div>

      <EditBranchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        branch={{ id, image, name, address, icon }}
        onSave={handleSave}
      />
    </>
  );
}

export default BranchCard;
