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
  ShoppingCart,
} from "lucide-react";

function SidebarLayout() {
  const location = useLocation();

  return (
    <div className="App flex h-screen overflow-hidden">
      <Sidebar className="flex-none w-64 h-full bg-white border-r border-gray-200 overflow-y-auto">
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" to="/dashboard" active={location.pathname === '/dashboard'} />
        <SidebarItem icon={<ShoppingCart size={20} />} text="Create Order" to="/orders" active={location.pathname === '/orders'} />
        <SidebarItem icon={<ShoppingBag size={20} />} text="Manage Orders" to="/manage-orders" active={location.pathname === '/manage-orders'} />
        <SidebarItem icon={<BookOpen size={20} />} text="Menu" to="/menu" active={location.pathname === '/menu'} />
        <SidebarItem icon={<ReceiptText size={20} />} text="Transactions" to="/transactions" active={location.pathname === '/transactions'} />
        <SidebarItem icon={<Package size={20} />} text="Inventory" to="/inventory" active={location.pathname === '/inventory'} />
        <SidebarItem icon={<Heart size={20} />} text="Feedback" to="/feedback" active={location.pathname === '/feedback'} />
      </Sidebar>
      <div className="flex-1 p-5 bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default SidebarLayout;
