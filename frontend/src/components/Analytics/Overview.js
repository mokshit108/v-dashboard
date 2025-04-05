import React from 'react';
import GraphAnalyticsComponent from './GraphAnalyticsComponent';
import InsightsCard from './InsightsCard';
import DemographicsDashboard from './DemographicsDashboard';

const Overview = () => {
  return (
    <div className="container">
      {/* Top Section: Graph + Insights side-by-side */}
      <div className="flex flex-wrap">
        {/* GraphAnalyticsComponent */}
        <div className="w-full lg:w-[70%] pr-0 lg:pr-2">
          <div className="pb-2 px-4 mb-4">
            <GraphAnalyticsComponent />
          </div>
        </div>

        {/* InsightsCard */}
        <div className="w-full lg:w-[25%] mt-4 lg:mt-0 lg:mr-5">
          <InsightsCard />
        </div>
      </div>

      {/* Full-width DemographicsDashboard */}
      <div className="w-full mt-6 px-4">
        <DemographicsDashboard />
      </div>
    </div>
  );
};

export default Overview;
