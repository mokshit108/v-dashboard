import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InsightsCard = () => {
  const [insightsData, setInsightsData] = useState({
    id: 1,
    founders: 74000,
    investors: 6.09000
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/insights');
        if (response.data && response.data.insights && response.data.insights.length > 0) {
          setInsightsData(response.data.insights[0]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching insights data:', err);
        setError('Failed to load insights data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format numbers for display with k suffix
  const formatNumber = (num) => {
    const number = Number(num);
    if (isNaN(number)) return '0';
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k';
    }
    return number.toFixed(1);
  };
  

  // Original values for display in gray
  const getOriginalValue = (num) => {
    return '(' + Math.round(num).toString() + ')';
  };

  return (
    <div className="w-full max-w-md font-manrope border-[#1D1D1D] border-b-2 bg-black rounded-lg shadow-lg px-8 pt-6 pb-6 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Heading */}
          <h1 className="text-xl font-bold text-white mb-6">Insights</h1>
          
          {/* Founders Section */}
          <div className="mb-6 relative">
            <h2 className="text-base font-medium text-white tracking-wide">Founders</h2>
            <div className="flex items-start mt-1">
              <p className="text-3xl font-bold text-white">{formatNumber(insightsData.founders)}</p>
              <div className="ml-2 flex flex-col">
                <span className="text-sm font-semibold" style={{ color: '#01754F' }}>+00.0%</span>
                <span className="text-xs" style={{ color: '#555555' }}>(000)</span>
              </div>
            </div>
          </div>
          
          {/* Investors Section */}
          <div className="mb-6 relative">
            <h2 className="text-md font-medium text-white tracking-wide">Investors</h2>
            <div className="flex items-start mt-1">
              <p className="text-3xl font-bold text-white">{formatNumber(insightsData.investors)}</p>
              <div className="ml-2 flex flex-col">
                <span className="text-sm font-semibold" style={{ color: '#01754F' }}>+00.0%</span>
                <span className="text-xs" style={{ color: '#555555' }}>(000)</span>
              </div>
            </div>
          </div>
          
          {/* Horizontal divider line */}
          <hr className="w-full border-gray-700 mb-4" />
          
          {/* Position container for absolute positioning */}
          <div className="relative pb-4 mt-6">
            {/* View details link - positioned bottom right */}
            <div className="absolute bottom-0 right-0 flex items-center text-xs text-white cursor-pointer hover:opacity-80 transition-opacity">
              <span className="text-white tracking-wide">View detailed insights</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 ml-1"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsCard;