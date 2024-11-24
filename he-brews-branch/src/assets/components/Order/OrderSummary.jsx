import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import PaymentMethod from './PaymentMethod';
import CashModal from './CashModal'; // Import the new CashModal component

function OrderSummary({ orderId }) {
  const [orderItems, setOrderItems] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showCashModal, setShowCashModal] = useState(false);
  const [dineOption, setDineOption] = useState('Dine-in'); // New state for dine-in/takeout

  // Fetch order items from the API (if the orderId is valid)
  useEffect(() => {
    const fetchOrderItems = async () => {
      if (!orderId) return;
      try {
        const response = await fetch(`https://hebrewssystem.onrender.com/api/order/${orderId}`);
        const data = await response.json();
        setOrderItems(data);
      } catch (error) {
        console.error('Error fetching order items:', error);
      }
    };
  
    fetchOrderItems();
  },);

  // Function to update the item quantity in the database
  const updateQuantityInDb = async (orderitem_id, action) => {
    try {
      await fetch(`https://hebrewssystem.onrender.com/api/order/${action}/${orderitem_id}`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  // Handlers for increasing and decreasing quantity
  const handleIncreaseQuantity = async (orderitem_id) => {
    setOrderItems((prevItems) =>
      prevItems.map(item =>
        item.orderitem_id === orderitem_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    await updateQuantityInDb(orderitem_id, 'increase');
  };

  const handleDecreaseQuantity = async (orderitem_id) => {
    setOrderItems((prevItems) =>
      prevItems.map(item =>
        item.orderitem_id === orderitem_id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    await updateQuantityInDb(orderitem_id, 'decrease');
  };

  // Calculate subtotal, tax, and total
  const subtotal = orderItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );
  const taxRate = 0.12;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Handle selecting a payment method
  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    if (method === 'Cash') {
      setShowCashModal(true);  // Show modal if Cash is selected
    } else {
      setShowCashModal(false);
    }
  };

  // Handle selecting dine-in or takeout option
  const handleDineOptionChange = (event) => {
    setDineOption(event.target.value);
  };

  return (
    <section className="flex flex-col w-full p-4">
      <div className="flex flex-col grow max-md:mt-8">
        <div className="flex flex-col grow shrink-0 py-5 bg-white rounded-3xl w-full">
          <div className="flex justify-between gap-4 px-4">
            <div className="text-lg font-bold text-black">Order #{orderId}</div>
            <div className="text-base font-semibold text-zinc-400">
              Date: {new Date().toLocaleDateString()}
            </div>
          </div>

          <div className="flex flex-col px-4 py-4 mt-6 font-semibold bg-white border-t border-b border-zinc-400">
            {orderItems.length > 0 ? (
              orderItems.map((item) => (
                <OrderItem
                  key={item.orderitem_id}
                  item={item}
                  increaseQuantity={() => handleIncreaseQuantity(item.orderitem_id)}
                  decreaseQuantity={() => handleDecreaseQuantity(item.orderitem_id)}
                />
              ))
            ) : (
              <div>No items in your order.</div>
            )}
          </div>

          {/* Dine-in or Takeout Option */}
          <div className="flex flex-col px-4 pt-3 pb-6 font-semibold">
            <div className="flex justify-between items-start gap-5">
              <div className="text-xs text-neutral-500">Choose Option</div>
              <div className="flex flex-col mt-1 text-sm">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="dine-in"
                    name="dine-option"
                    value="Dine-in"
                    checked={dineOption === 'Dine-in'}
                    onChange={handleDineOptionChange}
                    className="mr-2"
                  />
                  <label htmlFor="dine-in" className="mr-4">Dine-in</label>
                  <input
                    type="radio"
                    id="takeout"
                    name="dine-option"
                    value="Takeout"
                    checked={dineOption === 'Takeout'}
                    onChange={handleDineOptionChange}
                    className="mr-2"
                  />
                  <label htmlFor="takeout">Takeout</label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col px-4 pt-3 pb-6 font-semibold">
            <div className="flex justify-between items-start gap-5">
              <div className="flex flex-col text-xs">
                <div className="text-neutral-500">Sub Total</div>
                <div className="mt-5 text-neutral-500">Tax 12% (VAT Included)</div>
              </div>
              <div className="flex flex-col mt-1 text-sm whitespace-nowrap">
                <div className="text-zinc-700">₱{subtotal.toFixed(2)}</div>
                <div className="mt-4 text-neutral-700">₱{tax.toFixed(2)}</div>
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <div className="text-sm text-stone-700">Total</div>
              <div className="text-sm text-lime-500">₱{total.toFixed(2)}</div>
            </div>
          </div>

          {/* PaymentMethod component to select payment method */}
          <PaymentMethod onChange={handlePaymentMethodChange} />

          <button className="self-center px-8 py-4 mt-4 text-base font-semibold text-orange-200 bg-stone-700 rounded-3xl w-full max-w-[314px]">
            Place Order
          </button>

          {/* Cash Payment Modal */}
          {showCashModal && (
            <CashModal
              orderId={orderId} 
              subtotal={subtotal}
              total={total}
              tax={tax}
              dineOption={dineOption}  // Pass dine option to CashModal
              onClose={() => setShowCashModal(false)}  // Close modal handler
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default OrderSummary;