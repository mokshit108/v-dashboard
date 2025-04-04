// src/components/Layout/Layout.js
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 ">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-2">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;