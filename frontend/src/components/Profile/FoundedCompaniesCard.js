import React from 'react';
import { ExternalLink } from 'lucide-react';

const FoundedCompaniesCard = ({ companies }) => {
  return (
    <div className="rounded-lg shadow-md p-6 h-full bg-black text-white font-manrope">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">Founded Companies</h2>
        </div>
      </div>

      <div className="py-4">
        <span className="text-white text-6xl font-manrope font-bold">
          {companies?.length || 0}
        </span>
      </div>

      {companies && companies.length > 0 ? (
        <div className="space-y-6">
          {companies.map((company, index) => (
            <div 
              key={company.id || index} 
              className={`${index !== 0 ? 'border-t border-gray-700 pt-4' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">{company.company_name}</h3>
                    <span 
                      className="text-xs px-2 py-1 rounded-full" 
                      style={{ backgroundColor: '#579560', color: 'white' }}
                    >
                      CEO
                    </span>
                  </div>
                  {company.founding_date && (
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                      <span>Founded in {new Date(company.founding_date).getFullYear()}. in Fintech</span>
                    </div>
                  )}
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
          <p className="text-gray-400">No companies founded yet</p>
        </div>
      )}
    </div>
  );
};

export default FoundedCompaniesCard;