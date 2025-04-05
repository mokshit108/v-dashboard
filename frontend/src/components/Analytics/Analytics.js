import React, { useState } from 'react';
import Overview from './Overview';
import DemographicsDashboard from './DemographicsDashboard';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container">
      {/* Tabs Navigation */}
      <div className="flex border-b border-[#1D1D1D] mb-4">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'overview' 
             ? 'text-white' 
              : 'text-[#555555]'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        
        {/* Vertical line separator */}
        <div className="w-px -mt-2  bg-[#1D1D1D] self-stretch" />
        
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'demographics' 
              ? 'text-white' 
              : 'text-[#555555]'
          }`}
          onClick={() => setActiveTab('demographics')}
        >
          Demographics
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'demographics' && <DemographicsDashboard />}
      </div>
    </div>
  );
};

export default Analytics;