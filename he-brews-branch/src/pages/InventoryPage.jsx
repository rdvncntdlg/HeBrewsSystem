import React, { useState } from 'react';
import Header from '../assets/components/Header';
import StocksTable from '../assets/components/StocksTable';
import SuppliersTable from '../assets/components/SupplierTable';

function Inventory() {
  // State to hold stocks and suppliers data
  const [stocks, setStocks] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    id: '',
    name: '',
    quantity: '',
    supplier: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new stock to the stocks list
    setStocks([...stocks, formValues]);

    // Add supplier if it's not already in the suppliers list
    if (!suppliers.some(supplier => supplier.name === formValues.supplier)) {
      setSuppliers([...suppliers, { id: `SUPP${suppliers.length + 1}`, name: formValues.supplier, phone: '' }]);
    }

    // Clear form and close modal
    setFormValues({
      id: '',
      name: '',
      quantity: '',
      supplier: ''
    });
    setIsModalOpen(false);
  };

  return (
    <main className="flex flex-col ml-5 w-[95%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col self-stretch my-auto w-full text-black max-md:mt-10 max-md:max-w-full">
        <Header text="Inventory" />

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-end px-4 py-2 mt-8 text-white bg-gray-900 rounded-lg hover:bg-gray-700"
        >
          Add New Stock
        </button>

        <section>
          <h2 className="self-start mt-14 text-3xl font-bold max-md:mt-10">Stocks</h2>
          <StocksTable stockItems={stocks} />
        </section>

        <section>
          <h2 className="self-start mt-9 text-3xl font-bold">Suppliers</h2>
          <SuppliersTable suppliers={suppliers} />
        </section>
      </div>

      {/* Modal Box */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
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
              </div>

              <div className="mb-4">
                <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  value={formValues.supplier}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Inventory;
