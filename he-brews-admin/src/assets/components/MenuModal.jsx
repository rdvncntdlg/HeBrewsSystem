import React, { useState, useEffect } from 'react';

const MenuModal = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          const response = await fetch('https://hebrewssystem.onrender.com/api/categories');
          if (response.ok) {
            const data = await response.json();
            console.log(data); // Debug the categories in frontend
            setCategories(data);
          } else {
            console.error('Failed to fetch categories');
          }
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

      fetchCategories();
    }
  }, [isOpen]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);
  
    // Check the formData
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    try {
      const response = await fetch('https://hebrewssystem.onrender.com/api/products', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Product added:', result);
        onClose();
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };
  
  
  
  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add Product</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter price"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              accept="image/*"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuModal;
