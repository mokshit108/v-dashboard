import React from 'react';
import { User, Linkedin, Twitter, Mail, CheckCircle } from 'lucide-react';

const UserInfoCard = () => {
  return (
    <div className="bg-black max-md:mt-8 text-white rounded-lg shadow-md p-6 h-full font-manrope">
      <div className="flex">
        {/* Left side - Profile Icon (30%) */}
        <div className="w-3/10 pr-4">
          <div className="w-36 h-36 rounded-full flex items-center justify-center">
            <User size={108} className="text-white" />
          </div>
        </div>
        
        {/* Right side - User Info (70%) */}
        <div className="w-7/10">
          {/* Name with blue verification check */}
          <div className="flex items-center mb-1">
            <h2 className="text-2xl font-bold mr-32">Mr A</h2>
            <img src="/twitter-badge.png" alt="badge" className="w-4 h-4" />
          </div>
          
          {/* Title/Role */}
          <p className="text-white text-sm font-light mb-3">Co-Founder & CEO @Vertx</p>
          
          {/* Entrepreneur Badge */}
          <div className="mb-4">
            <span className="bg-white text-black text-xs px-3 py-1 rounded-md font-medium">
              Entrepreneur
            </span>
          </div>
          
          {/* Social Icons */}
          <div className="flex space-x-4 mt-8">
            <a href="#" className="hover:text-blue-500 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;