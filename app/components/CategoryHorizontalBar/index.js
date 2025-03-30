"use client";

import { monthlyBudgetSummary } from "@/app/service/budget.service";
import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-700 text-white p-3 rounded-lg shadow-lg z-50 relative">
                <p className="font-bold">{payload[0].payload.categoryName}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: <span className="font-semibold">{entry.value}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const CategorySpentChart = () => {
    const [data, setData] = useState([]);

    const getMonthlyBudgetSummary = async () => {
        const response = await monthlyBudgetSummary();
        setData(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        getMonthlyBudgetSummary();
    }, []);

    return (
        <div className="w-full h-auto p-4 bg-gray-700 shadow-md rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Category Spending</h2>
            <ResponsiveContainer width="100%" height={600}>
                <BarChart
                    layout="vertical"
                    data={data?.budgets}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    barCategoryGap={15}
                >
                    <XAxis type="number" tick={{ fill: "#8884d8" }} />
                    <YAxis
                        dataKey="categoryName"
                        type="category"
                        width={150}
                        tick={{ fill: "#8884d8" }}
                        padding={{ top: 10, bottom: 10 }}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "none" }} // Removes hover background effect
                        wrapperStyle={{ zIndex: 9999 }} // Ensures tooltip is on top
                    />
                    <Legend />
                    <Bar
                        dataKey="monthlyBudget"
                        fill="#3B82F6"
                        barSize={20}
                        radius={[0, 10, 10, 0]}
                    />
                    <Bar
                        dataKey="remaining"
                        fill="#22C55E" // Restored green color for "remaining"
                        barSize={20}
                        radius={[0, 10, 10, 0]}
                    />
                    <Bar
                        dataKey="spent"
                        fill="#EF4444" // Restored red color for "spent"
                        barSize={20}
                        radius={[0, 10, 10, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategorySpentChart;
