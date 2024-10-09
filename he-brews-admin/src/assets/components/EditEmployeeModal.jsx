import React, { useState, useEffect } from 'react';

function EditEmployeeModal({ isOpen, onClose, onUpdate, employeeData }) {
  const [employee, setEmployee] = useState({
    employee_id: '', // Ensure you have this field in the state
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    position: '', 
    password: '',
    phonenumber: ''
  });
  
  const [error, setError] = useState(null);

  // Pre-fill form fields with employee data when the modal is opened
  useEffect(() => {
    console.log("Employee Data Received:", employeeData); // Debugging
    if (employeeData) {
        setEmployee(employeeData);
    }
}, [employeeData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!employee.firstname || !employee.lastname || !employee.email || !employee.position || !employee.phonenumber) {
      setError("All fields except 'Password' are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(employee.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/employees/${employee.employee_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        const updatedEmployee = await response.json();
        onUpdate(updatedEmployee); // Notify parent component of the update
        onClose(); // Close modal
      } else {
        throw new Error('Failed to update employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      setError("Error updating employee. Please try again.");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">Edit Employee</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          {/* Display Employee ID */}
          <div className="mb-4">
            <label className="block text-gray-700">Employee ID</label>
            <input
              type="text"
              name="employee_id"
              value={employee.employee_id}
              readOnly
              className="border border-gray-300 p-2 w-full rounded bg-gray-100"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstname"
                value={employee.firstname}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={employee.lastname}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={employee.address}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Position</label>
              <input
                type="text"
                name="position"
                value={employee.position}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password (Leave blank to keep existing password)</label>
              <input
                type="password"
                name="password"
                value={employee.password}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phonenumber"
                value={employee.phonenumber}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default EditEmployeeModal;
