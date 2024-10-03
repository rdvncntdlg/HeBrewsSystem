import React from 'react';
import { Outlet } from 'react-router-dom';

function NonSidebarLayout() {
  return (
    <div className="App w-[100%]">
      <Outlet /> 
    </div>
  );
}

export default NonSidebarLayout;
