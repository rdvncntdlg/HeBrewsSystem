import React, { useState } from 'react';

function AddEmployeeModal({ isOpen, onClose, onAdd }) {
    const [employee, setEmployee] = useState({
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        username: '',
        password: '',
        phonenumber: '',
        position: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://hebrewssystem.onrender.com/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee),
            });

            if (response.ok) {
                const newEmployee = await response.json();
                onAdd(newEmployee);
                onClose();
            } else {
                console.error('Failed to add employee');
            }
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-lg font-bold mb-4">Add Employee</h2>
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
                                required
                                className="border border-gray-300 p-2 w-full rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={employee.username}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 p-2 w-full rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={employee.password}
                                onChange={handleChange}
                                required
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

                        <div className="mb-4">
                            <label className="block text-gray-700">Position</label>
                            <select
                                name="position"
                                value={employee.position}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 p-2 w-full rounded"
                            >
                                <option value="">Select a position</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="employee">Employee</option>
                            </select>
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
                                Add Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default AddEmployeeModal;
