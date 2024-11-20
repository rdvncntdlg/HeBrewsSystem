import React, { useState } from 'react';

const PaymentMethod = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option);  // Pass the selected option to parent component
  };

  return (
    <div className="flex justify-center space-x-4">
      {/* GCash Button */}
      <button
        className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
          selectedOption === 'GCash' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => handleOptionClick('GCash')}
      >
        GCash
      </button>

      {/* Cash Button */}
      <button
        className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
          selectedOption === 'Cash' ? 'bg-green-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => handleOptionClick('Cash')}
      >
        Cash
      </button>
    </div>
  );
};

export default PaymentMethod;