import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function EditBranchModal({ isOpen, onClose, branch, onSave }) {
  const [formData, setFormData] = useState({
    image: branch.image,
    name: branch.name,
    address: branch.address,
    icon: branch.icon
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://hebrewssystem.onrender.com/api/branches/${branch.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      onSave(); // Refresh or update the list of branches
    } catch (error) {
      console.error('Error updating branch:', error);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Branch</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              id="image"
              name="image"
              type="text"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Icon URL</label>
            <input
              id="icon"
              name="icon"
              type="text"
              value={formData.icon}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-500 text-white rounded">Cancel</button>
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default EditBranchModal;
