import React, { useState, useEffect } from 'react'; 
import Header from '../assets/components/Header';
import PreparingOrderList from '../assets/components/PreparingOrderList';
import ReadyOrderList from '../assets/components/ReadyOrderList';

function ManageOrdersPage() {


  return (
    <div className="max-md:pr-5 h-screen"> {/* Full page height */}
      <Header text="Manage Orders" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* First Order List */}
      <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Preparing</h2>
        <PreparingOrderList />
      </div>

      {/* Second Order List */}
      <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Ready</h2>
        <ReadyOrderList />
      </div>
    </div>
    </div>
    
  );
}

export default ManageOrdersPage;