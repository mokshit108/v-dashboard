import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaSignOutAlt, FaEllipsisV } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

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

    const navItems = [
        { title: 'Dashboard', path: '/dashboard' },
        { title: 'Analytics', path: '/analytics' },
        { title: 'Connect', path: '/connect' },
        { title: 'Dealroom', path: '/dealroom' },
        { title: 'Profile', path: '/profile' },
        { title: 'Settings', path: '/settings' }
    ];

    const activeItem = navItems.find(item => item.path === location.pathname) || { title: 'Dashboard' };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Toggle menu for mobile
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    // Mobile navbar
    if (isMobile) {
        return (
            <nav className="bg-black border-b border-[#1D1D1D] px-4 py-3 flex justify-between font-manrope items-center fixed top-0 left-0 right-0 z-50">
                {/* Left: Profile icon */}
                <Link to="/profile" className="flex items-center">
                    <CgProfile className="h-6 w-6 text-gray-500 hover:text-white" />
                </Link>

                {/* Center: Logo */}
                <div className="flex items-center">
                    <img src="/dashboard-logo.png" alt="Dashboard Logo" className="h-6 w-6" />
                </div>

                {/* Right: Three dots menu */}
                <div className="relative">
                    <button 
                        onClick={toggleMenu}
                        className="text-gray-500 hover:text-white"
                    >
                        <FaEllipsisV className="h-5 w-5" />
                    </button>
                    
                    {/* Dropdown menu */}
                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-40 bg-black border border-[#1D1D1D] rounded-md shadow-lg z-50">
                            <button
                                className="block w-full text-left px-4 py-2 text-white hover:bg-[#1D1D1D]"
                            >
                                Activity
                            </button>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-white hover:bg-[#1D1D1D]"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        );
    }

    // Desktop navbar (unchanged)
    return (
        <nav className="bg-black border-b border-[#1D1D1D] px-4 py-2.5 flex justify-between font-manrope items-center">
            {/* Left: Active page title */}
            <div className="font-manrope font-semibold text-[16px] leading-[100%] tracking-[-0.04em] text-white">
                {activeItem.title}
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Right: Logout and Activity */}
            <div className="flex items-center space-x-6">
                {/* Left Full Height Vertical Line */}
                <div className="w-px -m-2 bg-[#1D1D1D] self-stretch" />

                {/* Activity */}
                <span className="text-md text-white font-medium cursor-pointer">
                    Activity
                </span>

                {/* Right Full Height Vertical Line */}
                <div className="w-px -m-2 bg-[#1D1D1D] self-stretch" />

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center px-2 py-2 text-md rounded-md text-white"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;