import React, { useEffect, useState } from "react";
import { Edit, Trash } from 'lucide-react';
import EditEmployeeModal from "./EditEmployeeModal"; // Use the employee-specific modal

function EmployeeTable() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/employees");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching employees:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (employee_id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                const response = await fetch(`http://localhost:3000/api/employees/${employee_id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove deleted employee from the list
                    setEmployees(employees.filter(employee => employee.employee_id !== employee_id));
                } else {
                    throw new Error('Failed to delete employee');
                }
            } catch (error) {
                console.error('Error deleting employee:', error);
                alert('Failed to delete employee');
            }
        }
    };

    // Open the edit modal and set the employee data to be edited
    const handleEdit = (employee) => {
        console.log("Editing Employee:", employee); // Check the employee object here
        setEditingEmployee(employee);
        setIsEditModalOpen(true);
    };
    
    
    

    // Update employee data after editing
    const handleUpdateEmployee = (updatedEmployee) => {
        setEmployees(employees.map(e => (e.employee_id === updatedEmployee.employee_id ? updatedEmployee : e)));
        setIsEditModalOpen(false);
    };

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">Error: {error}</div>;
    }

    return (
        <>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Employee ID</th>
                        <th className="py-2 px-4 border-b">First Name</th>
                        <th className="py-2 px-4 border-b">Last Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Address</th>
                        <th className="py-2 px-4 border-b">Position</th> {/* New position field */}
                        <th className="py-2 px-4 border-b"></th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.employee_id} className="text-center">
                            <td className="py-2 px-4 border-b">{employee.employee_id}</td>
                            <td className="py-2 px-4 border-b">{employee.firstname}</td>
                            <td className="py-2 px-4 border-b">{employee.lastname}</td>
                            <td className="py-2 px-4 border-b">{employee.email}</td>
                            <td className="py-2 px-4 border-b">{employee.address}</td>
                            <td className="py-2 px-4 border-b">{employee.position}</td> {/* Display position */}
                            <td className="py-2 px-4 border-b flex items-center justify-center space-x-2">
                                <Edit
                                    className="text-custom-black cursor-pointer"
                                    onClick={() => handleEdit(employee)}
                                />
                                <Trash
                                    className="text-custom-black cursor-pointer"
                                    onClick={() => handleDelete(employee.employee_id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <EditEmployeeModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={handleUpdateEmployee} // Pass the updated employee handler
                    employeeData={editingEmployee} // Pass the correct employee data
                />
            )}
        </>
    );
}

export default EmployeeTable;
