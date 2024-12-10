import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';

const PreparingOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      const response = await fetch('https://hebrewscafeserver.onrender.com/api/preparing-orders', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching orders: ${response.statusText}`);
      }

      const data = await response.json();

      const ordersWithItems = await Promise.all(
        data.map(async (order) => {
          const itemsResponse = await fetch(`https://hebrewscafeserver.onrender.com/api/orders/${order.order_id}/items`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!itemsResponse.ok) {
            throw new Error(`Error fetching items for order ${order.order_id}: ${itemsResponse.statusText}`);
          }

          const itemsData = await itemsResponse.json();
          return { ...order, items: itemsData };
        })
      );

      setOrders(ordersWithItems);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching orders:', error);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  });

  // Handle accepting an order and setting status to "Ready"
  const handleAcceptOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://hebrewscafeserver.onrender.com/api/orders/${orderId}/ready`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Ready' }),
      });

      if (!response.ok) {
        throw new Error('Failed to accept the order');
      }

      // Fetch updated orders after accepting
      fetchOrders();
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  // Handle rejecting an order and setting status to "Cancelled"
  const handleRejectOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://hebrewscafeserver.onrender.com/api/orders/${orderId}/reject`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Cancelled' }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject the order');
      }

      // Fetch updated orders after rejecting
      fetchOrders();
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {orders.length === 0 ? (
        <div className="text-center">No pending orders</div>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.order_id}
            name={order.itemname}
            orderId={order.order_id}
            itemCount={order.items.length}
            totalPrice={order.total_price}
            status={order.status}
            type={order.type}
            items={order.items}
            onAccept={() => handleAcceptOrder(order.order_id)} // Accept order handler
            onReject={() => handleRejectOrder(order.order_id)} // Reject order handler
          />
        ))
      )}
    </div>
  );
};

export default PreparingOrderList;