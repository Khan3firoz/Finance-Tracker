import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import SelectDropdown from '../SelectDropdown';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Categories and Colors

const categories = [
    "Housing",
    "Food",
    "Transport",
    "Shopping",
    "Utilities",
    "Trip",
    "Entertainment",
    "EMI",
    "Clothing",
    "Education",    // New Category
    "Internet",     // New Category
];

const colors = [
    '#4B8BF5', // Housing
    '#42D8B5', // Food
    '#F5B342', // Transport
    '#F55A42', // Shopping
    '#B9F542', // Utilities
    '#F54B8B', // Trip
    '#42F5B3', // Entertainment
    '#8B42F5', // EMI
    '#F5428B', // Clothing
    '#F5A242', // Education
    '#42A2F5', // Internet
];


const mockYearlyData = {
    2020: {
        Housing: 14000,
        Food: 5800,
        Transport: 3500,
        Shopping: 1700,
        Utilities: 2300,
        Trip: 2500,
        Entertainment: 2000,
        EMI: 3000,
        Clothing: 1500,
        Education: 2000,    // New Data
        Internet: 1200,     // New Data
    },
    2021: {
        Housing: 14500,
        Food: 6000,
        Transport: 3600,
        Shopping: 1800,
        Utilities: 2400,
        Trip: 2600,
        Entertainment: 2100,
        EMI: 3100,
        Clothing: 1600,
        Education: 2200,    // New Data
        Internet: 1300,     // New Data
    },
    2022: {
        Housing: 14500,
        Food: 6000,
        Transport: 3600,
        Shopping: 1800,
        Utilities: 2400,
        Trip: 2600,
        Entertainment: 2100,
        EMI: 3100,
        Clothing: 1600,
        Education: 2200,    // New Data
        Internet: 1300,     // New Data
    },
    2023: {
        Housing: 14500,
        Food: 6000,
        Transport: 3600,
        Shopping: 1800,
        Utilities: 2400,
        Trip: 2600,
        Entertainment: 2100,
        EMI: 3100,
        Clothing: 1600,
        Education: 2200,    // New Data
        Internet: 1300,     // New Data
    },
    2024: {
        Housing: 14500,
        Food: 6000,
        Transport: 3600,
        Shopping: 1800,
        Utilities: 2400,
        Trip: 2600,
        Entertainment: 2100,
        EMI: 3100,
        Clothing: 1600,
        Education: 2200,    // New Data
        Internet: 1300,     // New Data
    },
// Add data for 2022, 2023, and 2024 similarly...
};


// Mock monthly data for each year
const mockMonthlyData = {
    2020: {
        January: { Housing: 1200, Food: 500, Transport: 300, Shopping: 150, Utilities: 200, Trip: 250, Entertainment: 180, EMI: 250, Clothing: 100, Education: 150, Internet: 100 },
        February: { Housing: 1250, Food: 550, Transport: 320, Shopping: 180, Utilities: 220, Trip: 260, Entertainment: 190, EMI: 270, Clothing: 110, Education: 160, Internet: 120 },
        // More months...
    },
    2021: {
        January: { Housing: 1300, Food: 600, Transport: 350, Shopping: 250, Utilities: 220, Trip: 270, Entertainment: 200, EMI: 300, Clothing: 120, Education: 170, Internet: 130 },
        February: { Housing: 1350, Food: 650, Transport: 370, Shopping: 220, Utilities: 240, Trip: 280, Entertainment: 210, EMI: 310, Clothing: 130, Education: 180, Internet: 140 },
        // More months...
    },
    2022: {
        January: { Housing: 1300, Food: 600, Transport: 350, Shopping: 250, Utilities: 220, Trip: 270, Entertainment: 200, EMI: 300, Clothing: 120, Education: 170, Internet: 130 },
        February: { Housing: 1350, Food: 650, Transport: 370, Shopping: 220, Utilities: 240, Trip: 280, Entertainment: 210, EMI: 310, Clothing: 130, Education: 180, Internet: 140 },
        // More months...
    },
    2023: {
        January: { Housing: 1300, Food: 600, Transport: 350, Shopping: 250, Utilities: 220, Trip: 270, Entertainment: 200, EMI: 300, Clothing: 120, Education: 170, Internet: 130 },
        February: { Housing: 1350, Food: 650, Transport: 370, Shopping: 220, Utilities: 240, Trip: 280, Entertainment: 210, EMI: 310, Clothing: 130, Education: 180, Internet: 140 },
        // More months...
    },
    2024: {
        January: { Housing: 1200, Food: 500, Transport: 300, Shopping: 150, Utilities: 200, Trip: 250, Entertainment: 180, EMI: 250, Clothing: 100, Education: 150, Internet: 100 },
        February: { Housing: 1250, Food: 550, Transport: 320, Shopping: 180, Utilities: 220, Trip: 260, Entertainment: 190, EMI: 270, Clothing: 110, Education: 160, Internet: 120 },
        // More months...
    }
    // Add data for 2022, 2023, and 2024 similarly...
};


const ChartComponent = () => {
    const [viewType, setViewType] = useState('monthly');
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [selectedYear, setSelectedYear] = useState('2020');

    // Determine data based on selected view type
    const data = viewType === 'monthly'
        ? mockMonthlyData[selectedYear][selectedMonth]
        : mockYearlyData[selectedYear];

    const chartData = {
        labels: categories,
        datasets: [
            {
                label: `${viewType.charAt(0).toUpperCase() + viewType.slice(1)} Spending`,
                data: categories.map(category => data[category]),
                backgroundColor: colors,
                borderColor: colors.map(color => color),
                borderWidth: 1,
                borderRadius: 16,
            },
        ],
    };

    const handleChangeViewType = (e) => {
        setViewType(e.target.value);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-700">
            {/* Filter to select monthly or yearly */}
            <div className="mb-4 flex gap-3">
                <div className='flex items-center justify-between w-full dark:text-white'>
                    <SelectDropdown
                        label="View Spending"
                        value={viewType}
                        options={['monthly', 'yearly']}
                        onChange={handleChangeViewType}
                    />
                </div>

                {/* Year and Month Selectors */}
                {viewType === 'monthly' && (
                    <div>
                        <SelectDropdown
                            value={selectedMonth}
                            options={Object.keys(mockMonthlyData[selectedYear])}
                            onChange={handleMonthChange}
                        />
                    </div>
                )}

                {viewType === 'yearly' && (
                    <div>
                        <SelectDropdown
                            value={selectedYear}
                            options={Object.keys(mockYearlyData)}
                            onChange={handleYearChange}
                        />
                    </div>
                )}
            </div>

            {/* Chart */}
            <Bar data={chartData} options={{
                responsive: true,
                indexAxis: 'y', // Horizontal bars
                plugins: {
                    title: {
                        display: true,
                        text: `${viewType.charAt(0).toUpperCase() + viewType.slice(1)} Spending by Category`,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `${tooltipItem.raw} INR`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 14,
                            },
                        },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 14,
                            },
                        },
                    },
                },
            }} />
        </div>
    );
};

export default ChartComponent;
