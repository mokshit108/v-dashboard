// src/App.js
import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  Outlet 
} from 'react-router-dom';

import Login from './components/Auth/Login';
import NotFound from './pages/NotFound';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Analytics from './components/Analytics/Analytics';

// Layout Route for authenticated routes
const LayoutRoute = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutRoute />} >
            <Route path="/dashboard" element={<div className='text-white'>Dashboard</div>} />
            <Route path="/analytics" element={<Analytics/>} />
            <Route path="/connect" element={<div className='text-white'>Connect</div>} />
            <Route path="/dealroom" element={<div className='text-white'>DealRoom</div>} />
            <Route path="/profile" element={<div className='text-white'>Profile</div>} />
            <Route path="/settings" element={<div className='text-white'>Settings</div>} />
            
            {/* Default route for authenticated users */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;