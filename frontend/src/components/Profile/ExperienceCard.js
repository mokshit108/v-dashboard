import React from 'react';
import { Briefcase, ExternalLink } from 'lucide-react';

const ExperienceCard = ({ experiences }) => {
  return (
    <div className="bg-black text-white font-manrope rounded-lg shadow-md p-6 h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">Work Experience</h2>
        </div>
      </div>

      <div className="py-4">
        <span className="text-white text-6xl font-manrope font-bold">
          {experiences?.length || 0}
        </span>
      </div>

      {experiences && experiences.length > 0 ? (
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <div 
              key={experience.id || index}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-medium">{experience.company_name}</h3>
                </div>
                <button className="flex items-center text-white hover:text-gray-300 text-sm">
                  View Profile <ExternalLink size={14} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-400">No work experience listed</p>
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;