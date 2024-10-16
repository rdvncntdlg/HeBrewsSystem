import React, { useState } from 'react'; 
import Header from '../assets/components/Header';
import StocksTable from '../assets/components/StocksTable';
import ExpiryTable from '../assets/components/ExpiryTable';

function Inventory() {
  const [stocks, setStocks] = useState([]); // State for stocks
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [formErrors, setFormErrors] = useState({}); // State for form errors
  const [formValues, setFormValues] = useState({
    id: '',
    name: '',
    quantity: '',
    expirationDate: ''
  });

  const validateForm = () => {
    const errors = {};
    const today = new Date();

    if (!formValues.id) errors.id = "ID is required.";
    if (!formValues.name) errors.name = "Name is required.";
    if (formValues.quantity <= 0) errors.quantity = "Quantity must be positive.";
<<<<<<< HEAD
=======
    if (!formValues.supplier) errors.supplier = "Supplier is required.";
    if (formValues.supplierPhone && !/^\d{11}$/.test(formValues.supplierPhone)) {
      errors.supplierPhone = "Phone number must be exactly 11 digits and contain only numbers.";
    }
>>>>>>> bb3bb46608ec10b2c5777c4df1feca7441b361de
    if (new Date(formValues.expirationDate) <= today) {
      errors.expirationDate = "Expiration date must be in the future.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStocks([...stocks, formValues]);

    // Reset form values and close the modal
    setFormValues({
      id: '',
      name: '',
      quantity: '',
      expirationDate: ''
    });
    setIsModalOpen(false);
  };

  const expiringItems = stocks.filter((item) => {
    const expirationDate = new Date(item.expirationDate);
    const today = new Date();
    const timeDiff = expirationDate - today;
    return timeDiff > 0 && timeDiff <= 30 * 24 * 60 * 60 * 1000;
  });

  return (
    <div className="h-screen overflow-hidden">
      <Header text="Inventory" />

      <div className="flex justify-end items-center mt-4 mb-6 px-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Add New Stock
        </button>
      </div>

      <main className="flex flex-col lg:flex-row w-full h-full overflow-hidden">
<<<<<<< HEAD
        <div className="flex flex-col w-full lg:w-[100%] px-4 overflow-hidden">
=======
        {/* Left side: Stocks and Suppliers */}
        <div className="flex flex-col w-full lg:w-[60%] px-4 overflow-hidden">
>>>>>>> bb3bb46608ec10b2c5777c4df1feca7441b361de
          <section className="mt-4">
            <h2 className="text-3xl font-bold">Stocks</h2>
            <div className="overflow-x-auto">
              <StocksTable stockItems={stocks} />
            </div>
          </section>
        </div>

<<<<<<< HEAD
=======
        {/* Right side: Expiring Items */}
>>>>>>> bb3bb46608ec10b2c5777c4df1feca7441b361de
        <div className="flex flex-col w-full lg:w-[40%] px-4 overflow-hidden">
          <section className="mt-0">
            <div>
              <ExpiryTable 
                expiringItems={expiringItems}
                className="rounded-lg"
              />
            </div>
          </section>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add New Stock Item</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">Item ID</label>
                <input
                  type="text"
                  name="id"
                  value={formValues.id}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  required
                />
                {formErrors.id && <p className="text-red-500 text-sm">{formErrors.id}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  required
                />
                {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formValues.quantity}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  required
                />
                {formErrors.quantity && <p className="text-red-500 text-sm">{formErrors.quantity}</p>}
              </div>

              <div className="mb-4">
<<<<<<< HEAD
=======
                <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  value={formValues.supplier}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  required
                />
                {formErrors.supplier && <p className="text-red-500 text-sm">{formErrors.supplier}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="supplierPhone" className="block text-sm font-medium text-gray-700">Supplier Phone</label>
                <input
                  type="tel" // Changed to "tel"
                  name="supplierPhone"
                  value={formValues.supplierPhone}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  maxLength={11} // Limit input to 11 digits
                  required
                />
                {formErrors.supplierPhone && <p className="text-red-500 text-sm">{formErrors.supplierPhone}</p>}
              </div>

              <div className="mb-4">
>>>>>>> bb3bb46608ec10b2c5777c4df1feca7441b361de
                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration Date</label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formValues.expirationDate}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  required
                />
                {formErrors.expirationDate && <p className="text-red-500 text-sm">{formErrors.expirationDate}</p>}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
