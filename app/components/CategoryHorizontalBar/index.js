"use client";

import { monthlyBudgetSummary } from '@/app/service/budget.service';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CategorySpentChart = () => {

    const [data, setData] = useState([])
    const getMonthlyBudgetSummary = async () => {
        const response = await monthlyBudgetSummary()
        setData(response.data)
        console.log(response.data)
    }

    useEffect(() => {
        getMonthlyBudgetSummary()
    }, [])

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
                    <XAxis type="number" tick={{ fill: '#8884d8' }} />
                    <YAxis
                        dataKey="categoryName"
                        type="category"
                        width={150}
                        tick={{ fill: '#8884d8' }}
                        padding={{ top: 10, bottom: 10 }}
                    />
                    <Tooltip formatter={(value, name) => [`${name}: ${value}`, 'Details']} />
                    <Legend />
                    <Bar dataKey="monthlyBudget" fill="#3B82F6" barSize={20} radius={[0, 10, 10, 0]} />
                    <Bar dataKey="remaining" fill="rgba(34, 197, 94, 0.7)" barSize={20} radius={[0, 10, 10, 0]} />
                    <Bar dataKey="spent" fill="rgba(239, 68, 68, 0.7)" barSize={20} radius={[0, 10, 10, 0]} />
                </BarChart>
            </ResponsiveContainer>
            {/* Override hover style on bars */}
            {/* <style jsx global>{`
        .recharts-rectangle:hover {
          fill-opacity: 1 !important;
        }
      `}</style> */}
        </div>
    );
};

export default CategorySpentChart;
