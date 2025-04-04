import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/dashboard" 
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;