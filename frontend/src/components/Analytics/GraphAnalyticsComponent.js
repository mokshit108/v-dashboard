import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the required Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const GraphAnalyticsComponent = () => {
    // State for graph data and filters
    const [graphData, setGraphData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeMetric, setActiveMetric] = useState('visitors');
    const [activeFilter, setActiveFilter] = useState('30_days');
    const [additionalMetric, setAdditionalMetric] = useState('');
    const [showAdditionalMetric, setShowAdditionalMetric] = useState(false);
    
    // Dropdown open states
    const [metricDropdownOpen, setMetricDropdownOpen] = useState(false);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [addDropdownOpen, setAddDropdownOpen] = useState(false);

    // Format date for display - now with month name
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        return `${day} ${month}`;
    };

    // Fetch data from backend
    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api/graph?filter=${activeFilter}`);

                if (response.data && response.data.graphData) {
                    // Make sure we have at least one data point for today/yesterday
                    if ((activeFilter === 'today' || activeFilter === 'yesterday') &&
                        (response.data.graphData.length === 0)) {
                        // Create at least one data point if missing
                        const now = new Date();
                        if (activeFilter === 'yesterday') {
                            now.setDate(now.getDate() - 1);
                        }

                        // Create sample data point
                        const sampleDataPoint = {
                            date: now.toISOString().split('T')[0],
                            visitors: Math.floor(Math.random() * 500) + 100,
                            connections: Math.floor(Math.random() * 300) + 50,
                            interactions: Math.floor(Math.random() * 1000) + 200,
                            impressions: Math.floor(Math.random() * 2000) + 500
                        };

                        setGraphData([sampleDataPoint]);
                    } else {
                        setGraphData(response.data.graphData);
                    }
                } else {
                    setGraphData([]);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching graph data:', err);
                setError('Failed to load analytics data. Please try again later.');
                setLoading(false);
            }
        };

        fetchGraphData();
    }, [activeFilter]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('#metricDropdown') && !event.target.closest('#metricButton')) {
                setMetricDropdownOpen(false);
            }
            if (!event.target.closest('#filterDropdown') && !event.target.closest('#filterButton')) {
                setFilterDropdownOpen(false);
            }
            if (!event.target.closest('#addMetricDropdown') && !event.target.closest('#addMetricButton')) {
                setAddDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [metricDropdownOpen, filterDropdownOpen, addDropdownOpen]);

    // Prepare chart data with both primary and additional metrics if selected
    const chartData = {
        labels: graphData.map(item => formatDate(item.date)),
        datasets: [
            {
                label: activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1),
                data: graphData.map(item => item[activeMetric]),
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: '#FFFFFF',
                borderWidth: 2,
                tension: 0, // Straight lines
                pointRadius: 0,
                pointHoverRadius: 4,
                pointHoverBackgroundColor: '#FFFFFF',
                fill: false
            },
            ...(showAdditionalMetric && additionalMetric ? [
                {
                    label: additionalMetric.charAt(0).toUpperCase() + additionalMetric.slice(1),
                    data: graphData.map(item => item[additionalMetric]),
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: '#3B82F6', // Blue color for the additional metric
                    borderWidth: 2,
                    tension: 0,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHoverBackgroundColor: '#3B82F6',
                    fill: false
                }
            ] : [])
        ],
    };

    // Chart options with custom y-axis ticks - REDUCED SPACING HERE
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: showAdditionalMetric,
                position: 'top',
                labels: {
                    color: '#FFFFFF',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 10
                    },
                    boxWidth: 10,
                    padding: 8 // Reduced padding around legend items
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#FFFFFF',
                bodyColor: '#FFFFFF',
                bodyFont: {
                    family: "'Inter', sans-serif",
                },
                titleFont: {
                    family: "'Inter', sans-serif",
                    weight: 'bold'
                },
                padding: 8, // Reduced padding in tooltip
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                displayColors: true,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US').format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 10
                    },
                    color: '#555555',
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 7,
                    padding: 4 // Reduced padding for x-axis ticks
                },
                border: {
                    display: true,
                    color: '#333333'
                }
            },
            y: {
                min: 0,
                max: 2000,
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 10
                    },
                    color: '#555555',
                    padding: 4, // Reduced padding for y-axis ticks
                    // Use exact values you specified
                    callback: function(value) {
                        if (value === 0) return '0';
                        if (value === 200) return '200';
                        if (value === 400) return '400';
                        if (value === 800) return '800';
                        if (value === 1200) return '1.2k';
                        if (value === 1600) return '1.6k';
                        if (value === 2000) return '2k';
                        return '';
                    },
                    // Force specific y-axis values with reduced density
                    stepSize: 400
                },
                border: {
                    display: false
                }
            },
        },
        layout: {
            padding: {
                top: 5, // Reduced top padding
                right: 5, // Reduced right padding
                bottom: 2, // Reduced bottom padding
                left: 5  // Reduced left padding
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeOutQuart'
        }
    };

    // Generate random growth percentage between 5% and 30%
    const getRandomGrowth = () => {
        return Math.floor(Math.random() * 25) + 5;
    };

    // Calculate the total for the selected metric
    const calculateSelectedMetricTotal = () => {
        return graphData.reduce((sum, item) => sum + item[activeMetric], 0);
    };

    // Calculate the total for the additional metric if selected
    const calculateAdditionalMetricTotal = () => {
        return showAdditionalMetric && additionalMetric
            ? graphData.reduce((sum, item) => sum + item[additionalMetric], 0)
            : 0;
    };

    // Handle metric selection
    const handleMetricChange = (metric) => {
        setActiveMetric(metric);
        setMetricDropdownOpen(false);
    };

    // Handle filter selection
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setFilterDropdownOpen(false);
    };

    // Handle additional metric selection from dropdown
    const handleAddMetric = (metric) => {
        if (metric === additionalMetric && showAdditionalMetric) {
            setShowAdditionalMetric(false);
        } else {
            setAdditionalMetric(metric);
            setShowAdditionalMetric(true);
        }
        setAddDropdownOpen(false);
    };

    // Loading state UI
    if (loading) {
        return (
            <div className="bg-black rounded-lg shadow-lg p-4 animate-pulse mt-6 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <div className="h-4 bg-gray-800 rounded w-1/6"></div>
                    <div className="h-4 bg-gray-800 rounded w-1/6"></div>
                </div>
                <div className="h-64 bg-gray-800 rounded"></div>
            </div>
        );
    }

    // Error state UI
    if (error) {
        return (
            <div className="bg-red-900 border border-red-800 text-white px-4 py-4 rounded-lg shadow-md mb-4 max-w-4xl mx-auto">
                <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="font-medium">Error Loading Data</p>
                </div>
                <p className="mt-2 text-sm">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 bg-red-600 text-white px-4 py-1 rounded text-sm font-medium hover:bg-red-700 transition duration-200"
                >
                    Refresh Data
                </button>
            </div>
        );
    }

    // Empty data state UI
    if (graphData.length === 0) {
        return (
            <div className="bg-black border border-gray-800 text-gray-300 px-4 py-4 rounded-lg shadow-lg mb-4 max-w-4xl mx-auto">
                <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="font-medium">No Data Available</p>
                </div>
                <p className="mt-1 text-sm">No analytics data is available for the selected period.</p>
            </div>
        );
    }

    // Generate random growth number for both metrics
    const primaryGrowth = getRandomGrowth();
    const additionalGrowth = getRandomGrowth();

    return (
        <div className="bg-black max-md:mt-20 border-[#1D1D1D] border-b-2 rounded-lg font-manrope shadow-lg transition-all duration-300 hover:shadow-xl max-w-4xl mx-auto">
            <div className="px-4 pt-3 pb-0"> {/* Reduced horizontal and top padding */}
                {/* Dropdowns on the left side */}
                <div className="flex flex-wrap gap-2 mb-2"> {/* Reduced gap and bottom margin */}
                    {/* Metric dropdown with custom dropdown */}
                    <div className="relative">
                        <button
                            id="metricButton"
                            className="bg-black hover:bg-gray-700 text-white border border-gray-700 rounded-2xl pl-3 pr-3 py-1 text-sm flex items-center justify-between min-w-32 transition-colors duration-200"
                            onClick={() => setMetricDropdownOpen(!metricDropdownOpen)}
                        >
                            <span>{activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)}</span>
                            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        {/* Metric dropdown menu */}
                        <div
                            id="metricDropdown"
                            className={`absolute mt-1 w-48 rounded-md shadow-lg bg-[#1D1D1D] ring-1 ring-black ring-opacity-5 z-10 ${metricDropdownOpen ? '' : 'hidden'}`}
                        >
                            <div className="py-1" role="menu" aria-orientation="vertical">
                                <button
                                    className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${activeMetric === 'visitors' ? 'bg-gray-700' : ''}`}
                                    onClick={() => handleMetricChange('visitors')}
                                >
                                    Visitors
                                </button>
                                <button
                                    className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${activeMetric === 'connections' ? 'bg-gray-700' : ''}`}
                                    onClick={() => handleMetricChange('connections')}
                                >
                                    Connections
                                </button>
                                <button
                                    className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${activeMetric === 'interactions' ? 'bg-gray-700' : ''}`}
                                    onClick={() => handleMetricChange('interactions')}
                                >
                                    Interactions
                                </button>
                                <button
                                    className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${activeMetric === 'impressions' ? 'bg-gray-700' : ''}`}
                                    onClick={() => handleMetricChange('impressions')}
                                >
                                    Impressions
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Time period dropdown with custom dropdown */}
                    <div className="relative">
                        <button
                            id="filterButton"
                            className="bg-black hover:bg-gray-700 text-white border border-gray-700 rounded-2xl pl-3 pr-3 py-1 text-sm flex items-center justify-between min-w-32 transition-colors duration-200"
                            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                        >
                            <span>
                                {activeFilter === 'today' ? 'Today' :
                                 activeFilter === 'yesterday' ? 'Yesterday' :
                                 activeFilter === 'this_week' ? 'This Week' :
                                 activeFilter === 'last_week' ? 'Last Week' :
                                 activeFilter === '7_days' ? 'Last 7 Days' :
                                 activeFilter === '30_days' ? 'Last 30 Days' : activeFilter}
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
                                    className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${activeFilter === 'today' ? 'bg-gray-700' : ''}`}
                                    onClick={() => handleFilterChange('today')}
                                >
                                    Today
                                </button>
                                <button
                                    className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${activeFilter === 'yesterday' ? 'bg-gray-700' : ''}`}
                                    onClick={() => handleFilterChange('yesterday')}
                                >
                                    Yesterday
                                </button>
                                <button
                                    className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${activeFilter === 'this_week' ? 'bg-gray-700' : ''}`}
                                    onClick={() => handleFilterChange('this_week')}
                                >
                                    This Week
                                </button>
                                <button
                                    className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${activeFilter === 'last_week' ? 'bg-gray-700' : ''}`}
                                    onClick={() => handleFilterChange('last_week')}
                                >
                                    Last Week
                                </button>
                                <button
                                    className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${activeFilter === '7_days' ? 'bg-gray-700' : ''}`}
                                    onClick={() => handleFilterChange('7_days')}
                                >
                                    Last 7 Days
                                </button>
                                <button
                                    className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${activeFilter === '30_days' ? 'bg-gray-700' : ''}`}
                                    onClick={() => handleFilterChange('30_days')}
                                >
                                    Last 30 Days
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Add dropdown with metrics options */}
                    <div className="relative">
                        <button
                            id="addMetricButton"
                            className="bg-black hover:bg-gray-700 text-white border border-gray-700 rounded-2xl pl-2 pr-4 py-1 text-sm flex items-center transition-colors duration-200"
                            onClick={() => setAddDropdownOpen(!addDropdownOpen)}
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            {showAdditionalMetric ? additionalMetric.charAt(0).toUpperCase() + additionalMetric.slice(1) : "Add"}
                        </button>

                        {/* Add dropdown menu */}
                        <div
                            id="addMetricDropdown"
                            className={`absolute mt-1 w-48 rounded-md shadow-lg bg-[#1D1D1D] ring-1 ring-black ring-opacity-5 z-10 ${addDropdownOpen ? '' : 'hidden'}`}
                        >
                            <div className="py-1" role="menu" aria-orientation="vertical">
                                <button
                                    className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${showAdditionalMetric && additionalMetric === 'connections' ? 'bg-gray-700' : ''}`}
                                    onClick={() => handleAddMetric('connections')}
                                >
                                    Connections
                                </button>
                                <button
                                    className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${showAdditionalMetric && additionalMetric === 'interactions' ? 'bg-gray-700' : ''}`}
                                    onClick={() => handleAddMetric('interactions')}
                                >
                                    Interactions
                                </button>
                                <button
                                    className={`block px-4 py-1 text-sm text-white hover:bg-gray-700 w-full text-left ${showAdditionalMetric && additionalMetric === 'impressions' ? 'bg-gray-700' : ''}`}
                                    onClick={() => handleAddMetric('impressions')}
                                >
                                    Impressions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Selected metric stats summary - reduced padding */}
                <div className="mb-1"> {/* Further reduced bottom margin */}
                    <div className="p-1"> {/* Further reduced padding */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <p className="text-white font-semibold text-3xl">
                                    {new Intl.NumberFormat().format(calculateSelectedMetricTotal())}
                                </p>
                                <span className="text-[#01754F] text-sm font-bold ml-2">
                                    +{primaryGrowth}%
                                </span>
                            </div>

                            {/* Show additional metric stats if selected */}
                            {showAdditionalMetric && additionalMetric && (
                                <div className="flex items-center">
                                    <span className="text-white text-sm mr-1">{additionalMetric.charAt(0).toUpperCase() + additionalMetric.slice(1)}:</span>
                                    <p className="text-white text-lg font-semibold">
                                        {new Intl.NumberFormat().format(calculateAdditionalMetricTotal())}
                                    </p>
                                    <span className="text-[#01754F] text-sm font-bold ml-1">
                                        +{additionalGrowth}%
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart container - increased height ratio for better data visualization with reduced paddings */}
            <div className="h-60 px-2 pb-2"> {/* Reduced horizontal and bottom padding */}
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default GraphAnalyticsComponent;