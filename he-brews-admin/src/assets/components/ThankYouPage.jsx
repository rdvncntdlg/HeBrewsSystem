// ThankYouPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg text-center">
            <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
            <p className="text-lg mb-6">We appreciate your feedback. Thank you for taking the time to complete our survey.</p>
            <Link to="/" className="text-blue-500 hover:text-blue-700">
                Return to Home
            </Link>
        </div>
    );
};

export default ThankYouPage;
