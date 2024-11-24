import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerSatisfactionSurvey = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        order_id: '',
        visitFrequency: '',
        reasons: [],
        others: '',
        serviceSatisfaction: '',
        complaints: '',
        recommendation: '',
        ratings: {
            food: '',
            drinks: '',
            menu: '',
            amountOfServing: '',
            foodQuality: '',
            customerService: '',
            ambiance: '',
            price: ''
        },
        comments: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRatingChange = (e, category) => {
        setFormData({
            ...formData,
            ratings: {
                ...formData.ratings,
                [category]: e.target.value
            }
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const surveyData = {
            name: formData.name,
            age: formData.age,
            visitFrequency: formData.visitFrequency,
            order_id: formData.order_id,
            reasons: formData.reasons,
            others: formData.others,
            serviceSatisfaction: formData.serviceSatisfaction,
            complaints: formData.complaints,
            recommendation: formData.recommendation,
            ratings: formData.ratings,
            comments: formData.comments
        };
    
        try {
            const response = await fetch('https://hebrewssystem.onrender.com/submit-survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(surveyData),
            });
    
            if (response.ok) {
                navigate('/thank-you');
            } else {
                alert('Error submitting survey');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
      

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Customer Satisfaction Survey</h2>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Age:</label>
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>

            {/* Branch Information */}
            <div className="mt-6">
                <label className="block text-gray-700">Order Number:</label>
                <input
                    type="text"
                    name="order_id"
                    value={formData.order_id}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Survey Questions */}
            <div className="mt-6">
                <label className="block text-gray-700">1. How often do you visit He Brews Café?</label>
                <select
                    name="visitFrequency"
                    value={formData.visitFrequency}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                >
                    <option value="Regularly">Regularly</option>
                    <option value="Sometimes">Sometimes</option>
                    <option value="Never">Never</option>
                </select>
            </div>

            <div className="mt-6">
                <label className="block text-gray-700">2. What makes you choose He Brews Café over other coffee shops?</label>
                <div className="flex flex-wrap space-x-4 mt-2">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="reasons"
                            value="Customer Service"
                            checked={formData.reasons.includes('Customer Service')}
                            onChange={handleChange}
                            className="form-checkbox"
                        />
                        <span className="ml-2">Customer Service</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="reasons"
                            value="Drinks"
                            checked={formData.reasons.includes('Drinks')}
                            onChange={handleChange}
                            className="form-checkbox"
                        />
                        <span className="ml-2">Drinks</span>
                    </label>
                    {/* Add more checkboxes similarly */}
                    <input
                        type="text"
                        name="others"
                        value={formData.others}
                        placeholder="Others"
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <div className="mt-6">
                <label className="block text-gray-700">3. Are you satisfied with the customer service and ambiance?</label>
                <div className="mt-2">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="serviceSatisfaction"
                            value="Yes"
                            onChange={handleChange}
                            className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            name="serviceSatisfaction"
                            value="No"
                            onChange={handleChange}
                            className="form-radio"
                        />
                        <span className="ml-2">No</span>
                    </label>
                </div>
            </div>

            {/* More Questions */}
            <div className="mt-6">
                <label className="block text-gray-700">4. Have you encountered any complaints?</label>
                <div className="mt-2">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="complaints"
                            value="Yes"
                            onChange={handleChange}
                            className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            name="complaints"
                            value="No"
                            onChange={handleChange}
                            className="form-radio"
                        />
                        <span className="ml-2">No</span>
                    </label>
                </div>
            </div>

            <div className="mt-6">
                <label className="block text-gray-700">5. Will you recommend us to your family and friends?</label>
                <div className="mt-2">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="recommendation"
                            value="Yes"
                            onChange={handleChange}
                            className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            name="recommendation"
                            value="No"
                            onChange={handleChange}
                            className="form-radio"
                        />
                        <span className="ml-2">No</span>
                    </label>
                </div>
            </div>

            {/* Ratings Section */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold">Please rate the following (5 - Excellent, 1 - Poor)</h3>
                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Category</th>
                                <th className="border border-gray-300 px-4 py-2">5</th>
                                <th className="border border-gray-300 px-4 py-2">4</th>
                                <th className="border border-gray-300 px-4 py-2">3</th>
                                <th className="border border-gray-300 px-4 py-2">2</th>
                                <th className="border border-gray-300 px-4 py-2">1</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'Food', field: 'food' },
                                { name: 'Drinks', field: 'drinks' },
                                { name: 'Menu', field: 'menu' },
                                { name: 'Amount of Serving', field: 'amountOfServing' },
                                { name: 'Food Quality', field: 'foodQuality' },
                                { name: 'Customer Service', field: 'customerService' },
                                { name: 'Ambiance', field: 'ambiance' },
                                { name: 'Price', field: 'price' }
                            ].map((category) => (
                                <tr key={category.field} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                                    {[5, 4, 3, 2, 1].map((rating) => (
                                        <td key={rating} className="border border-gray-300 px-4 py-2">
                                            <input
                                                type="radio"
                                                name={category.field}
                                                value={rating}
                                                onChange={(e) => handleRatingChange(e, category.field)}
                                                className="form-radio"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Comments Section */}
            <div className="mt-6">
                <label className="block text-gray-700">Comments:</label>
                <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    rows="4"
                ></textarea>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
                Submit Survey
            </button>
        </form>
    );
};

export default CustomerSatisfactionSurvey;