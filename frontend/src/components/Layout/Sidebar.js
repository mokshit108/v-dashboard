// src/components/Layout/Sidebar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { 
  FaHome, 
  FaBullhorn, 
  FaLayerGroup, 
  FaBolt, 
  FaUsers, 
  FaCog, 
  FaUserFriends,
  FaSignOutAlt
} from 'react-icons/fa';
import { GiMoebiusTriangle } from "react-icons/gi";

import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { GrBarChart } from "react-icons/gr";
import { GrFlows } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdFormatListBulleted } from "react-icons/md";
import { CiSliderHorizontal } from "react-icons/ci";

// Remove the alias and use a standard import
// import { Card } from '@/components/ui/card';
// Or if you don't have the Card component, let's make a simple one
const Card = ({ children, className }) => (
  <div className={`rounded-lg shadow-sm ${className}`}>{children}</div>
);

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Navigation items with FontAwesome icons and paths
  const navItems = [
    { 
      title: 'Dashboard', 
      path: '/dashboard',
    },
    { 
      title: 'Analytics', 
      path: '/analytics',
    },
    { 
      title: 'Connect', 
      path: '/connect',
    },
    { 
      title: 'Dealroom', 
      path: '/dealroom',
    },
    { 
      title: 'Profile', 
      path: '/profile',
    },
    { 
      title: 'Settings', 
      path: '/settings',
    }
  ];

  // Function to check if a navigation item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <Card className="h-screen bg-black w-56 flex-shrink-0 font-normal font-nunito flex flex-col">
      {/* Company name/logo */}
      <div className="px-6 py-4 flex items-center border-b border-gray-200 gap-3">
        <GiMoebiusTriangle className="h-6 w-6"  />
        <h1 className="text-xl font-bold text-black">Salesway</h1>
      </div>

      {/* Menu section */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-sm text-gray-500 font-medium">MENU</span>
        </div>
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex text-center pl-4 items-center px-2 py-2 text-md rounded-md group 
                ${isActive(item.path) 
                  ? 'bg-white text-gray-900 font-semibold font-sans border border-gray-100 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <span className={`mr-3 ${isActive(item.path) ? 'text-blue-600 fill-current' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout button (at the bottom) */}
      <div className="mt-auto px-6 py-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center px-2 py-2 w-full text-md rounded-md text-gray-600 hover:bg-gray-100"
        >
          <span className="mr-3 text-gray-500">
            <FaSignOutAlt className="h-5 w-5" />
          </span>
          Logout
        </button>
      </div>
    </Card>
  );
};

export default Sidebar;