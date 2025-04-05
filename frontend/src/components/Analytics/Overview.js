import React from 'react';
import GraphAnalyticsComponent from './GraphAnalyticsComponent';
import InsightsCard from './InsightsCard';
import DemographicsDashboard from './DemographicsDashboard';

const Overview = () => {
  return (
    <div className="container">
      {/* Top Section: Graph + Insights side-by-side */}
      <h1 className="text-3xl font-manrope font-bold ml-4 md:ml-12 mt-2 md:mt-6 text-white mb-6">Overview</h1>
      <div className="flex flex-wrap mx-0 md:mx-10">
        {/* GraphAnalyticsComponent */}
        <div className="w-full lg:w-[70%] pr-0 lg:pr-2">
          <div className="pb-2 mb-4">
            <GraphAnalyticsComponent />
          </div>
        </div>

        {/* InsightsCard */}
        <div className="w-full lg:w-[30%] mt-4 lg:mt-0">
          <InsightsCard />
        </div>
      </div>

      {/* Full-width DemographicsDashboard */}
      <div className="w-full mt-6 px-2">
        <DemographicsDashboard />
      </div>
    </div>
  );
};

export default Overview;
