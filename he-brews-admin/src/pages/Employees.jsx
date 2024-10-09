import React, { useState } from 'react';
import Header from '../assets/components/Header';
import SearchBar from '../assets/components/SearchBar';
import EmployeeTable from '../assets/components/EmployeeTable'; // Replace with EmployeeTable component
import AddEmployeeModal from '../assets/components/AddEmployeeModal'; // Use AddEmployeeModal

function Employees() {
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  const handleOpenAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(true);
  };

  const handleCloseAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(false);
  };

  const handleAddEmployee = (newEmployee) => {
    // Add logic to update the employee list or state
    console.log('New employee added:', newEmployee);
  };

  return (
    <div className="overflow-hidden max-md:pr-5">
      <Header text="Employees" />
      <div className="flex justify-end mt-8 mb-4">
        <SearchBar />
      </div>
      <section className="mt-16 max-md:mt-10 max-md:max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Employees</h3>
          <button
            onClick={handleOpenAddEmployeeModal}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Employee
          </button>
        </div>
        <EmployeeTable /> {/* Replaced with EmployeeTable */}
      </section>
      <AddEmployeeModal
        isOpen={isAddEmployeeModalOpen}
        onClose={handleCloseAddEmployeeModal}
        onAdd={handleAddEmployee}
        // Pass other props or handlers as needed
      />
    </div>
  );
}

export default Employees;
