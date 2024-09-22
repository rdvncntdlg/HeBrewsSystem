import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Menu from './pages/MenuPage';
import Transactions from './pages/TransactionsPage';
import Inventory from './pages/InventoryPage';
import Feedback from './pages/FeedbackPage';
import SidebarLayout from './pages/SidebarLayout'; // Adjust the path as needed
import NonSidebarLayout from './pages/NonSidebarLayout'; // Adjust the path as needed

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without sidebar */}
        <Route element={<NonSidebarLayout />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        {/* Routes with sidebar */}
        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
