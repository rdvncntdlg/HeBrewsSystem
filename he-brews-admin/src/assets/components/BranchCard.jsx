import React, { useState } from 'react';
import EditBranchModal from './EditBranchModal';
import { Edit, X } from 'lucide-react';

function BranchCard({ id, image, name, address, icon, onUpdate, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = (updatedBranch) => {
    handleCloseModal();
    if (onUpdate) onUpdate(updatedBranch); // Call the parent function to refresh the data
  };

  const fetchBranches = async () => {
    try {
      const response = await fetch('https://hebrewscafeserver.onrender.com/api/branches');
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log('Deleting branch with ID:', id); // Log the ID
    try {
      const response = await fetch(`https://hebrewscafeserver.onrender.com/api/branches/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete branch');
      }
  
      fetchBranches(); // Refresh the branch list
    } catch (error) {
      console.error('Error deleting branch:', error);
    }
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
            <div className="flex items-center">
              <Edit onClick={handleOpenModal} className="mr-2 cursor-pointer" />
              <X onClick={() => handleDelete(id)} className="cursor-pointer text-red-500" />
            </div>
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
