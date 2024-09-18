import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import Menu from './pages/MenuPage';
import Transactions from './pages/TransactionsPage';
import Inventory from './pages/InventoryPage';
import Branch from './pages/Branches';
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
          <Route path="/users" element={<UsersPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/branch" element={<Branch />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
