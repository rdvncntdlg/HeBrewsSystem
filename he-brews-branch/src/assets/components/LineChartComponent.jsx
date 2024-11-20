import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ data }) => {
  const [filter, setFilter] = useState('daily');

  // Sample filtering logic (you can customize this based on your actual data)
  const filterData = (data) => {
    switch (filter) {
      case 'daily':
        return data; // Assuming `data` is already daily data.
      case 'weekly':
        return data.filter((_, index) => index % 7 === 0); // Example: pick every 7th item as weekly data.
      case 'monthly':
        return data.filter((_, index) => index % 30 === 0); // Example: pick every 30th item as monthly data.
      case 'yearly':
        return data.filter((_, index) => index % 365 === 0); // Example: pick every 365th item as yearly data.
      default:
        return data;
    }
  };

  const filteredData = filterData(data);

  return (
    <div className="relative">
      {/* Text and Dropdown */}
      <div className="flex justify-end items-center mb-4">
        <span className="mr-2 text-gray-700">Select Time Period:</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md p-2 bg-white"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={filteredData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;