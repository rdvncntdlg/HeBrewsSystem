import React, { useState, useEffect } from 'react';

const CashModal = ({ orderId, subtotal, total, tax, dineOption, onClose }) => {
  const [cashGiven, setCashGiven] = useState(0);
  const [change, setChange] = useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [serverName, setServerName] = useState('');
  const [branchId, setBranchId] = useState('');
  const [branch, setBranch] = useState('');
  const [branchLocation, setBranchLocation] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false); // Track if payment is submitted

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await fetch(`https://hebrewssystem.onrender.com/api/order-items/${orderId}`);
        const data = await response.json();
        setOrderItems(data);
      } catch (error) {
        console.error('Error fetching order items:', error);
      }
    };

    const fetchBranch = async () => {
      try {
        const response = await fetch('https://hebrewssystem.onrender.com/api/branchname', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (data.length > 0) {
          setBranchId(data[0].branch_id);
          setBranch(data[0].branchname);
          setBranchLocation(data[0].branchlocation);
        } else {
          console.error('No branch found');
        }
      } catch (error) {
        console.error('Error fetching branch:', error);
      }
    };

    const fetchEmployeeProfile = async () => {
      try {
        const response = await fetch('https://hebrewssystem.onrender.com/employee-profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setEmployeeId(data.user.id);
          setServerName(data.user.firstname);
        }
      } catch (error) {
        console.error('Error fetching employee profile:', error);
      }
    };

    if (orderId) {
      fetchOrderItems();
    }
    fetchBranch();
    fetchEmployeeProfile();
  }, [orderId]);

  useEffect(() => {
    // Update change whenever cashGiven or subtotal changes
    if (cashGiven >= subtotal) {
      setChange(cashGiven - subtotal);
    } else {
      setChange(0);
    }
  }, [cashGiven, subtotal]);

  const generateReceipt = (data) => {
    return (
      <div>
        <div className="text-center text-l text-gray-600 mb-1">{branch}</div>
        <div className="text-center text-xs text-gray-500">
          {branchLocation}
          <br />
          Order: {data.orderId}
          <br />
          Server: {serverName || 'Unknown'}
          <br />
          Time: {new Date().toLocaleString()}
        </div>

        <div className="mt-4 pt-2">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="font-semibold text-left px-2 py-1">Item</th>
                <th className="font-semibold text-center px-2 py-1">Qty</th>
                <th className="font-semibold text-center px-2 py-1">Amt</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.length > 0 ? (
                orderItems.map((item, index) => (
                  <tr key={`${item.menu_id}-${index}`}>
                    <td className="px-2 py-1">{item.itemname}</td>
                    <td className="text-center px-2 py-1">{item.quantity}</td>
                    <td className="text-center px-2 py-1">₱{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">No items found for this order.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-400 pt-1">
          <table className="min-w-full text-sm">
            <tbody>
              <tr>
                <td className="px-2 py-1">Sub Total</td>
                <td className="px-2 py-1 text-right">₱{subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="px-2 py-1">Tax 12%</td>
                <td className="px-2 py-1 text-right">₱{tax.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="px-2 py-1 font-semibold">Total</td>
                <td className="px-2 py-1 font-semibold text-right">₱{total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between text-sm mt-2">
          <span>Cash</span>
          <span>₱{cashGiven.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span>Change</span>
          <span>₱{change.toFixed(2)}</span>
        </div>
      </div>
    );
  };

  // Submit the payment and generate the receipt
  const submitPaymentAndPrint = async () => {
    try {
      const paymentData = {
        orderId,
        employeeId,
        branchId,
        totalAmount: total,
        type: dineOption,
        paymentMethod: 'Cash',
        invoiceDate: new Date().toISOString(),
      };

      const response = await fetch('https://hebrewssystem.onrender.com/api/submit-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Payment successful:', responseData);
        const receipt = generateReceipt(responseData);
        setReceipt(receipt); // Set the receipt data to be displayed
        setIsPaymentSubmitted(true); // Set flag to show receipt part

        // After payment is successful, trigger print dialog
        setTimeout(() => {
          window.print();
        }, 500);
      } else {
        console.error('Error submitting payment:', responseData);
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-96 p-6 space-y-6">
        <div className="py-4" id="receipt-content">
          <img
            src={`https://hebrewssystem.onrender.com/uploads/logo-black.png`}
            alt="Logo"
            className="mx-auto w-28 h-28 object-contain"
          />

          {isPaymentSubmitted ? (
            // If payment is submitted, show receipt (without Close button)
            <div className="receipt-container">
              {receipt}
            </div>
          ) : (
            <div>
              <div className="text-center text-lg text-gray-600 mb-4">Enter Cash Amount</div>
              <input
                type="number"
                value={cashGiven}
                onChange={(e) => setCashGiven(parseFloat(e.target.value))}
                className="w-full py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Enter cash given"
              />
              <div className="flex justify-between text-sm mt-4">
                <span>Change</span>
                <span>₱{change.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-between space-x-4">
            {!isPaymentSubmitted ? (
              <button
                onClick={submitPaymentAndPrint}
                className="bg-green-500 text-white py-2 px-4 rounded-md w-full"
              >
                Submit Payment
              </button>
            ) : null}
            <button
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-4 rounded-md w-full close-button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {/* Tailwind CSS to hide close button on print */}
      <style>
        {`
          @media print {
            .close-button {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CashModal; 