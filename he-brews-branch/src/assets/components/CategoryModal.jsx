import React, { useState } from "react";

const CategoryModal = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      setError("Category name is required.");
      return;
    }

    try {
      // Create FormData to send category name and image
      const formData = new FormData();
      formData.append("name", categoryName);
      if (image) {
        formData.append("image", image);
      }

      // Make API request to the server
      const response = await fetch("http://localhost:3000/api/add-categories", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const message = await response.json();
        setError(message.error || "An error occurred.");
        return;
      }

      const data = await response.json();
      console.log("Category created:", data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit the category.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-96 p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-500 mr-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
