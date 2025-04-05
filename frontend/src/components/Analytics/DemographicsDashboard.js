import React, { useState, useEffect } from "react";
import axios from "axios";

const DemographicsDashboard = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("visitors"); // Could be "visitors", "users", "customers"
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchDemographics = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/demographics");
        console.log("Fetched Demographics Data:", response.data);
        
        // Check if the API response has the expected structure
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          // Map the data to match our component's expected format
          const formattedData = response.data.data.map(country => ({
            name: country.country_name,
            code: country.country_name.substring(0, 2), // Generate a simple code if none exists
            percentage: parseFloat(country.percentage),
            id: country.id
          }));
          
          // Sort countries by percentage in descending order
          const sortedCountries = formattedData.sort((a, b) => b.percentage - a.percentage);
          setCountries(sortedCountries);
          setLoading(false);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        setError("Failed to load demographics data");
        setLoading(false);
        console.error("Error fetching demographics:", err);
      }
    };

    fetchDemographics();
  }, []);

  const handleFilterChange = (filter) => {
    setView(filter);
    setFilterDropdownOpen(false);
  };

  const getCountryColor = (index) => {
    const colors = ["bg-[#4834D4]", "bg-[#BD5302]", "bg-[#E9C16B]", "bg-[#579560]", "bg-blue-500", "bg-red-500"];
    return colors[index % colors.length];
  };

  const getCountryDot = (index) => {
    const colors = ["text-[#4834D4]", "text-[#BD5302]", "text-[#E9C16B]", "text-[#579560]", "text-blue-500", "text-red-500"];
    return colors[index % colors.length];
  };

  // Shared filter button style class
  const filterButtonStyle = "bg-black hover:bg-gray-700 text-white border border-gray-700 rounded-2xl pl-3 pr-3 py-1 text-sm flex items-center justify-between min-w-32 transition-colors duration-200";

  if (loading) {
    return (
      <div className="bg-black rounded-lg shadow p-4 mb-4 text-white">
        <h2 className="text-xl font-semibold mb-4">Demographics</h2>
        <div className="flex justify-center items-center p-6">
          <p>Loading demographics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black rounded-lg shadow p-4 mb-4 text-white">
        <h2 className="text-xl font-semibold mb-4">Demographics</h2>
        <div className="flex justify-center items-center p-6 text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black md:mx-10 border-[#1D1D1D] border-b-2 rounded-lg shadow p-4 mt-8 mb-4 text-white">
      <div className="mb-2">
        <h2 className="text-xl font-semibold">Demographics</h2>
      </div>
      
      <div className="mb-4">
        <div className="relative">
          <button
            id="filterButton"
            className={filterButtonStyle}
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
          >
            <span>
              {view === 'visitors' ? 'Visitors' :
               view === 'users' ? 'Users' :
               view === 'customers' ? 'Customers' : view}
            </span>
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {/* Filter dropdown menu */}
          <div
            id="filterDropdown"
            className={`absolute mt-1 w-48 rounded-md shadow-lg bg-[#1D1D1D] ring-1 ring-black ring-opacity-5 z-10 ${filterDropdownOpen ? '' : 'hidden'}`}
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${view === 'visitors' ? 'bg-gray-700' : ''}`}
                onClick={() => handleFilterChange('visitors')}
              >
                Visitors
              </button>
              <button
                className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${view === 'users' ? 'bg-gray-700' : ''}`}
                onClick={() => handleFilterChange('users')}
              >
                Users
              </button>
              <button
                className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${view === 'customers' ? 'bg-gray-700' : ''}`}
                onClick={() => handleFilterChange('customers')}
              >
                Customers
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-4">
        {/* World Map Column */}
        <div className="col-span-12 md:col-span-7 relative">
          {/* World Map Visualization - This would ideally be an SVG map with dots */}
          <div className="h-64 relative">
            {/* Placeholder for world map - in production, use an actual SVG map */}
            <div className="absolute inset-0 opacity-30">
              <img src="/map-world.jpg" alt="World Map" className="h-full w-full object-contain" />
            </div>
            
            {/* Country Markers - In production, position these based on actual coordinates */}
            {countries.map((country, index) => (
              <div 
                key={country.id} 
                className={`absolute flex items-center justify-center`}
                style={{
                  top: getCountryPosition(country.name).top, 
                  left: getCountryPosition(country.name).left
                }}
              >
                {/* Outer spread circle */}
                <div className={`w-6 h-6 border-solid rounded-full ${getCountryDot(index).replace("text", "bg")} opacity-20 absolute`}></div>
                {/* Inner dot */}
                <div className={`w-2 h-2 rounded-full ${getCountryDot(index).replace("text", "bg")} z-10`}></div>
              </div>
            ))}
          </div>
          
          {/* Legend - Unified container with rounded corners, all items inside */}
          <div className="mt-4 px-5 py-2 bg-black rounded-3xl border border-gray-700 w-max max-w-full">
            <div className="flex flex-wrap gap-8">
              {countries.map((country, index) => (
                <div key={country.id} className="flex items-center">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <div className={`w-4 h-4 rounded-full ${getCountryDot(index).replace("text", "bg")}`}></div>
                  </div>
                  <span className="ml-1 text-sm">{country.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Country Stats Column */}
        <div className="col-span-12 md:col-span-5">
          <div className="space-y-4">
            {countries.map((country, index) => (
              <div key={country.id} className="space-y-1">
                <div className="flex items-center space-x-2">
                  <img 
                    src={`/${country.name}.jpg`} 
                    alt={`${country.name} flag`} 
                    className="w-9 h-7"
                  />
                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{country.name}</span>
                      <span className="text-sm">{country.percentage}%</span>
                    </div>
                    {/* Progress bar with original size (h-2), starting from country name */}
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className={`${getCountryColor(index)} h-2 rounded-full`} 
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Horizontal line below Country Stats */}
          <div className="border-t border-gray-700 my-8"></div>
          
          {/* "View all countries" button moved to bottom right of Country Stats Column */}
          <div className="flex justify-end">
            <button className="text-sm text-white flex items-center">
              View all countries
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 ml-1"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Function to get approximate positions for countries on the map
function getCountryPosition(countryName) {
  // These are approximate positions - in a real app you'd use actual coordinates
  const positions = {
    "India": { top: "45%", left: "68%" },
    "USA": { top: "38%", left: "20%" },
    "CANADA": { top: "10%", left: "28%" },
    "UAE": { top: "44%", left: "57%" },
    // Add more countries as needed
  };
  
  // Return the position if found, otherwise return a random position
  return positions[countryName] || { 
    top: `${30 + Math.random() * 40}%`, 
    left: `${20 + Math.random() * 60}%` 
  };
}

export default DemographicsDashboard;