import React, { useState, useEffect } from 'react';
import UserInfoCard from './UserInfoCard';
import FoundedCompaniesCard from './FoundedCompaniesCard';
import ExperienceCard from './ExperienceCard';

const Profile = () => {
  const [companies, setCompanies] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        // Assuming you have the user ID from context/auth
        const userId = localStorage.getItem('userId') || '1'; // Default to 1 for demo
        
        // Fetch companies founded
        const companiesResponse = await fetch(`${API_BASE_URL}/api/companies-founded/${userId}`);
        if (!companiesResponse.ok) throw new Error('Failed to fetch companies');
        const companiesData = await companiesResponse.json();
        
        // Fetch experience
        const experienceResponse = await fetch(`${API_BASE_URL}/api/experience/${userId}`);
        if (!experienceResponse.ok) throw new Error('Failed to fetch experience');
        const experienceData = await experienceResponse.json();
      
        setCompanies(companiesData.data || []);
        setExperiences(experienceData.data || []);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);

  if (loading) return <div className="flex justify-center p-8">Loading profile...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      
       {/* User Info Card */}
        <div className="col-span-1">
          <UserInfoCard />
        </div>
      
      <div className="flex flex-col md:flex-row w-full gap-4">
        {/* Founded Companies Card - 50% width */}
        <div className="w-full md:w-1/2  p-4 rounded-lg">
          <FoundedCompaniesCard companies={companies} />
        </div>
        
        {/* Experience Card - 50% width */}
        <div className="w-full md:w-1/2 p-4 rounded-lg">
          <ExperienceCard experiences={experiences} />
        </div>
      </div>
    </div>
  );
};

export default Profile;