import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar, { SidebarItem } from "../assets/components/Sidebar";
import {
  Package,
  LayoutDashboard,
  ShoppingBag,
  BookOpen,
  ReceiptText,
  Store,
  Heart,
} from "lucide-react";

function SidebarLayout() {
  const location = useLocation(); // Get current location

  return (
    <div className="App flex h-screen overflow-hidden">
      <Sidebar className="flex-none w-64 h-full bg-white border-r border-gray-200 overflow-y-auto">
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" to="/dashboard" active={location.pathname === '/dashboard'} />
        <SidebarItem icon={<ShoppingBag size={20} />} text="Orders" to="/orders" active={location.pathname === '/orders'} />
        <SidebarItem icon={<BookOpen size={20} />} text="Menu" to="/menu" active={location.pathname === '/menu'} />
        <SidebarItem icon={<ReceiptText size={20} />} text="Transactions" to="/transactions" active={location.pathname === '/transactions'} />
        <SidebarItem icon={<Package size={20} />} text="Inventory" to="/inventory" active={location.pathname === '/inventory'} />
        <SidebarItem icon={<Heart size={20} />} text="Feedback" to="/feedback" active={location.pathname === '/feedback'} />
      </Sidebar>
      <div className="flex-1 p-5 bg-gray-100 overflow-auto">
        <Outlet /> {/* Render child routes here */}
      </div>
    </div>
  );
}

export default SidebarLayout;
