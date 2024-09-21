import React, { useState } from 'react';
import Header from '../assets/components/Header';
import SearchBar from '../assets/components/SearchBar';
import CustomerTable from '../assets/components/CustomerTable';
// Import or create the component for adding a customer
import AddCustomerModal from '../assets/components/AddCustomerModal';

function Users() {
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);

  const handleOpenAddCustomerModal = () => {
    setIsAddCustomerModalOpen(true);
  };

  const handleCloseAddCustomerModal = () => {
    setIsAddCustomerModalOpen(false);
  };
  const handleAddCustomer = (newCustomer) => {
    // Add logic to update the customer list or state
    console.log('New customer added:', newCustomer);
  };

  return (
    <div className="overflow-hidden max-md:pr-5">
      <Header text="Users" />
      <div className="flex justify-end mt-8 mb-4">
        <SearchBar />
      </div>
      <section className="mt-16 max-md:mt-10 max-md:max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Customers</h3>
          <button
            onClick={handleOpenAddCustomerModal}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Customer
          </button>
        </div>
        <CustomerTable />
      </section>
      <AddCustomerModal
        isOpen={isAddCustomerModalOpen}
        onClose={handleCloseAddCustomerModal}
        onAdd={handleAddCustomer}
        // Pass other props or handlers as needed
      />
    </div>
  );
}

export default Users;
