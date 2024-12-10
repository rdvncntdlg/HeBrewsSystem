import React, { useState, useEffect } from 'react';

function EditProductModal({ isOpen, onClose, product, onUpdate }) {
  const [id, setId] = useState(product.id || ''); // Initialize id state
  const [name, setName] = useState(product.name || '');
  const [price, setPrice] = useState(product.price || '');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(product.image || ''); // Set initial image preview from product data

  useEffect(() => {
    if (product) {
      setId(product.id); // Update id when product changes
      setName(product.name);
      setPrice(product.price);
      setImagePreview(product.image);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a URL for image preview
    } else {
      setImage(null);
      setImagePreview(''); // Clear preview if no file is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    if (image) formData.append('image', image);

    try {
      const response = await fetch(`https://hebrewscafeserver.onrender.com/api/products/${id}`, { // Correct API URL
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('Error updating product');
      const updatedProduct = await response.json();
      onUpdate(updatedProduct);
      onClose(); // Close the modal on successful update
      // Optionally reload the page
       
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCancel = () => {
    onClose(); // Close the modal when cancel is clicked
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Edit Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="w-full h-auto rounded"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : null
  );
}

export default EditProductModal;
