import React from "react";

const spendingData = [
    { category: "Housing", amount: 15000, color: "bg-blue-500" },
    { category: "Food", amount: 10000, color: "bg-green-500" },
    { category: "Transport", amount: 8000, color: "bg-yellow-500" },
    { category: "Shopping", amount: 6000, color: "bg-pink-500" },
    { category: "Utilities", amount: 4000, color: "bg-purple-500" },
];

const maxAmount = 20000; // Maximum value for the scale
const scaleSteps = maxAmount / 2000; // Divide into intervals of ₹5000
const stepValue = 2000; // Increment per step

const HorizontalBarChart = () => {
    return (
        <div className="relative w-full mx-auto p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
            {/* Chart Header */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-start">
                Spending by Category
            </h2>

            {/* Bars and Vertical Line */}
            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-16 md:left-32 top-0 bottom-0 w-px bg-gray-400"></div>

                {/* Bars */}
                <div className="space-y-6">
                    {spendingData.map((item) => (
                        <div
                            key={item.category}
                            className="flex items-center space-x-4"
                        >
                            {/* Category Label */}
                            <span className="w-16 md:w-32 text-sm font-medium text-gray-600 dark:text-gray-300">
                                {item.category}
                            </span>
                            {/* Horizontal Bar */}
                            <div className="relative flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg">
                                <div
                                    className={`absolute top-0 left-0 h-full ${item.color} rounded-lg`}
                                    style={{
                                        width: `${(item.amount / maxAmount) * 100}%`,
                                    }}
                                ></div>
                            </div>
                            {/* Amount */}
                            <span className="w-16 text-sm font-medium text-red-500">
                                ₹{item.amount}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scale */}
            <div className="relative py-6">
                {/* Horizontal Scale Line */}
                <div className="absolute left-16 md:left-32 w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] h-px bg-gray-300 dark:bg-gray-500"></div>
                {/* Scale Values */}
                <div className="absolute left-16 md:left-32 w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] h-px flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
                    {Array.from({ length: scaleSteps + 1 }).map((_, index) => (
                        <span key={index} className="text-center">
                            ₹{index * stepValue}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HorizontalBarChart;
