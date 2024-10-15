import React, { useEffect, useState } from 'react';

function StocksTable() {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStockItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/inventory');
        if (!response.ok) {
          throw new Error('Failed to fetch stock items');
        }
        const data = await response.json();
        setStockItems(data); // Assuming data is an array of stock items
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockItems();
  }, []);

  return (
    <div className="mt-5">
      {loading ? (
        <div className="text-center py-4 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <table className="min-w-full bg-neutral-950 rounded-3xl">
          <thead>
            <tr className="text-sm font-bold text-white bg-neutral-800">
              <th className="px-8 py-4 text-left">ITEM ID</th>
              <th className="px-8 py-4 text-left">NAME</th>
              <th className="px-8 py-4 text-left">QUANTITY</th>
              <th className="px-8 py-4 text-left">EXPIRATION DATE</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.length > 0 ? (
              stockItems.map((item, index) => (
                <tr key={item.inventory_id} className={`${index % 2 === 0 ? 'bg-zinc-300' : 'bg-white'} text-xs`}>
                  <td className="px-8 py-2">{item.inventory_id}</td>
                  <td className="px-8 py-2">{item.itemname}</td>
                  <td className="px-8 py-2">{item.quantity}</td>
                  <td className="px-8 py-2">{new Date(item.expirationdate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No stock items available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StocksTable;
