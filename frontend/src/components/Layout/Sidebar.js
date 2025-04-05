import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faEarthEurope,faBell,faFan } from '@fortawesome/free-solid-svg-icons';

import { 
  FaHome, 
  FaBullhorn, 
  FaLayerGroup, 
  FaBolt, 
  FaUsers, 
  FaCog, 
  FaUserFriends,
  FaSignOutAlt,
  FaPlus
} from 'react-icons/fa';
import { GiMoebiusTriangle } from "react-icons/gi";
import { BsThreeDots } from 'react-icons/bs';

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
  <div className={`shadow-sm ${className}`}>{children}</div>
);

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

 
  
  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Navigation items with paths (no icons for desktop)
  // Main navigation items
  const mainNavItems = [
    { 
      title: 'Dashboard', 
      path: '/dashboard',
      icon: <LuLayoutDashboard className="h-5 w-5" />
    },
    {
      title: 'Analytics',
      path: '/analytics',
      icon: <FontAwesomeIcon icon={faChartLine} className="h-5 w-5" />
    },
    {
      title: 'Connect',
      path: '/connect',
      icon: <FontAwesomeIcon icon={faEarthEurope} className="h-5 w-5" />
    },
    { 
      title: 'Dealroom', 
      path: '/dealroom',
      icon: <FontAwesomeIcon icon={faFan} />
    }
  ];

  const mobileItems = [
    { 
      title: 'Dashboard', 
      path: '/dashboard',
      icon: <LuLayoutDashboard className="h-5 w-5" />
    },
    {
      title: 'Analytics',
      path: '/analytics',
      icon: <FontAwesomeIcon icon={faChartLine} className="h-5 w-5" />
    },
    {
      title: 'Connect',
      path: '/connect',
      icon: <FontAwesomeIcon icon={faEarthEurope} className="h-5 w-5" />
    },
    {
      title: 'Activity',
      path: '/activity',
      icon: <FontAwesomeIcon icon={faBell} />
    },
    { 
      title: 'Dealroom', 
      path: '/dealroom',
      icon: <FontAwesomeIcon icon={faFan} />
    }
  ];


  // Secondary navigation items for the three dots menu
  const moreNavItems = [
    { 
      title: 'Profile', 
      path: '/profile',
      icon: <CgProfile className="h-5 w-5" />
    },
    { 
      title: 'Settings', 
      path: '/settings',
      icon: <IoSettingsOutline className="h-5 w-5" />
    }
  ];

  // All nav items for desktop view
  const navItems = [...mainNavItems, ...moreNavItems];

  // Function to check if a navigation item is active
  const isActive = (path) => {
    return location.pathname === path;
  };


  // Mobile bottom navigation - only show 5 main nav items
  if (isMobile) {
    return (
      <>
        <div className="fixed bottom-0 left-0 right-0 border-t-2 border-[#1D1D1D] bg-black h-16 flex justify-around items-center z-40">
          {mobileItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center justify-center ${
                isActive(item.path) ? 'text-white' : 'text-custom-gray'
              }`}
            >
              <span className={isActive(item.path) ? 'text-[#555555]' : 'text-white'}>
                {item.icon}
              </span>
              <span className={isActive(item.path) ? 'text-[#555555] text-xs' : 'text-white text-xs'}>
                {item.title}
              </span>
            </Link>
          ))}
          
        </div>

        {/* Mobile dropdown menu */}
        {showMobileMenu && (
          <div className="fixed bottom-16 right-0 bg-gray-900 rounded-tl-lg shadow-lg z-50 w-48 py-2">
            {moreNavItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center px-4 py-3 text-white hover:bg-gray-800"
                onClick={() => setShowMobileMenu(false)}
              >
                <span className="mr-3 text-gray-400">
                  {item.icon}
                </span>
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <Card className="h-screen bg-black w-60 flex-shrink-0 font-normal font-manrope flex flex-col relative">
      {/* Company name/logo */}
      <div className="pr-6 pl-3 py-4 flex items-center border-b border-[#1D1D1D] gap-8">
        <img src="/dashboard-logo.png" alt="Dashboard Logo" className="h-6 w-6" />
        <h1 className="text-[18px] leading-[100%] font-bold text-white tracking-[-0.04em] font-manrope">
          Vertxlabs, Inc
        </h1>
      </div>

      <div className="flex flex-1">
        {/* Left side column with icons */}
        <div className="w-12 flex flex-col items-center relative">
          {/* Profile icon below logo */}
          <div className="mt-6 mb-4">
            <Link to="/profile" className="flex items-center justify-center">
              <CgProfile className="h-6 w-6 text-gray-500 hover:text-white" />
            </Link>
          </div>

          {/* Plus icon at bottom */}
          <div className="mt-auto mb-6">
            <button className="flex items-center justify-center">
              <FaPlus className="h-4 w-4 text-white hover:text-white" />
            </button>
          </div>
        </div>

        {/* Vertical line */}
        <div className="w-px bg-[#1D1D1D] h-full"></div>

        {/* Right side with navigation */}
        <div className="flex-1">
          <div className="py-3 px-3">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex text-center items-center px-2 py-2 text-md rounded-md group 
                    ${isActive(item.path) 
                      ? ' text-white' 
                      : 'text-custom-gray'}`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logout button */}
          {/* <div className="mt-auto px-3 py-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center px-2 py-2 w-full text-md rounded-md text-gray-600 hover:bg-gray-100"
            >
            
               <span className="mr-3 text-gray-500">
                <FaSignOutAlt className="h-5 w-5" />
              </span> 
              Logout
            </button>
          </div> */}
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;