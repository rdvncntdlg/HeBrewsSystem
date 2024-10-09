import React, { useEffect, useState } from "react";
import { Edit, Trash, Eye } from 'lucide-react';
import EditCustomerModal from "./EditCustomerModal"; // Import the modal component

function CustomerTable() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/customers");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching customers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const handleDelete = async (customer_id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                const response = await fetch(`http://localhost:3000/api/customers/${customer_id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove deleted customer from the list
                    setCustomers(customers.filter(customer => customer.customer_id !== customer_id));
                } else {
                    throw new Error('Failed to delete customer');
                }
            } catch (error) {
                console.error('Error deleting customer:', error);
                alert('Failed to delete customer');
            }
        }
    };

    // Open the edit modal and set the customer data to be edited
    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setIsEditModalOpen(true);
    };

    // Update customer data after editing
    const handleUpdateCustomer = (updatedCustomer) => {
        setCustomers(customers.map(c => (c.customer_id === updatedCustomer.customer_id ? updatedCustomer : c)));
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
                        <th className="py-2 px-4 border-b">Customer ID</th>
                        <th className="py-2 px-4 border-b">First Name</th>
                        <th className="py-2 px-4 border-b">Last Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Address</th>
                        <th className="py-2 px-4 border-b"></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.customer_id} className="text-center">
                            <td className="py-2 px-4 border-b">{customer.customer_id}</td>
                            <td className="py-2 px-4 border-b">{customer.firstname}</td>
                            <td className="py-2 px-4 border-b">{customer.lastname}</td>
                            <td className="py-2 px-4 border-b">{customer.email}</td>
                            <td className="py-2 px-4 border-b">{customer.address}</td>
                            <td className="py-2 px-4 border-b flex items-center justify-center space-x-2">
                                <Edit
                                    className="text-custom-black cursor-pointer"
                                    onClick={() => handleEdit(customer)}
                                />
                                <Trash
                                    className="text-custom-black cursor-pointer"
                                    onClick={() => handleDelete(customer.customer_id)}
                                />
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <EditCustomerModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={handleUpdateCustomer} // Renamed from onSave to onUpdate
                    customerData={editingCustomer} // Pass the correct customer data
                />
            )}
        </>
    );
}

export default CustomerTable;
