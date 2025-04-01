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
            <div className="bg-gray-700 text-white p-2 rounded-lg shadow-lg z-50 relative">
                <p className="font-medium text-xs sm:text-sm">{payload[0].payload.categoryName}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-xs" style={{ color: entry.color }}>
                        {entry.name}: <span className="font-medium">{entry.value}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const CategorySpentChart = () => {
    const [data, setData] = useState([]);
    const [chartHeight, setChartHeight] = useState(400);

    const getMonthlyBudgetSummary = async () => {
        const response = await monthlyBudgetSummary();
        setData(response.data);
    };

    useEffect(() => {
        getMonthlyBudgetSummary();

        const updateChartHeight = () => {
            if (window.innerWidth < 640) {
                setChartHeight(300);
            } else {
                setChartHeight(400);
            }
        };

        updateChartHeight();
        window.addEventListener('resize', updateChartHeight);
        return () => window.removeEventListener('resize', updateChartHeight);
    }, []);

    return (
        <div className="w-full h-auto">
            <h2 className="text-sm sm:text-base font-medium mb-1 sm:mb-2 text-white">Category Spending</h2>
            <ResponsiveContainer width="100%" height={chartHeight}>
                <BarChart
                    layout="vertical"
                    data={data?.budgets}
                    margin={{
                        top: 10,
                        right: 5,
                        left: 5,
                        bottom: 5
                    }}
                    barCategoryGap={10}
                >
                    <XAxis
                        type="number"
                        tick={{
                            fill: "#8884d8",
                            fontSize: 10
                        }}
                    />
                    <YAxis
                        dataKey="categoryName"
                        type="category"
                        width={80}
                        tick={{
                            fill: "#8884d8",
                            fontSize: 10
                        }}
                        padding={{ top: 5, bottom: 5 }}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "none" }}
                        wrapperStyle={{ zIndex: 9999 }}
                    />
                    <Legend
                        wrapperStyle={{
                            fontSize: 10
                        }}
                    />
                    <Bar
                        dataKey="monthlyBudget"
                        fill="#3B82F6"
                        barSize={12}
                        radius={[0, 6, 6, 0]}
                    />
                    <Bar
                        dataKey="remaining"
                        fill="#22C55E"
                        barSize={12}
                        radius={[0, 6, 6, 0]}
                    />
                    <Bar
                        dataKey="spent"
                        fill="#EF4444"
                        barSize={12}
                        radius={[0, 6, 6, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategorySpentChart;
