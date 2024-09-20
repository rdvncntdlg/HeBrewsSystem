import React, { useState } from 'react';

function AddBranchModal({ onClose }) {
  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [branchImage, setBranchImage] = useState(null);
  const [branchIcon, setBranchIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    setBranchImage(e.target.files[0]);
  };

  const handleIconChange = (e) => {
    setBranchIcon(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', branchName);
    formData.append('address', branchAddress);
    formData.append('image', branchImage);
    formData.append('icon', branchIcon);

    try {
      const response = await fetch('http://localhost:3000/api/add-branches', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add branch');
      }

      const result = await response.json();
      console.log('Branch added successfully:', result);
      setLoading(false);
      onClose(); // Close the modal after success
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Error adding branch');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl mb-4">Add New Branch</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Branch Name</label>
            <input 
              type="text" 
              value={branchName} 
              onChange={(e) => setBranchName(e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Branch Address</label>
            <input 
              type="text" 
              value={branchAddress} 
              onChange={(e) => setBranchAddress(e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Branch Image</label>
            <input 
              type="file" 
              onChange={handleImageChange} 
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300" 
              accept="image/*"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Branch Icon</label>
            <input 
              type="file" 
              onChange={handleIconChange} 
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300" 
              accept="image/*"
            />
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <div className="flex justify-end gap-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Branch'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBranchModal;
