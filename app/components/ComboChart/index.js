import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const generateMockData = () => {
    const data = [];
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 5); // 5 years back

    for (let i = 0; i < 1825; i++) { // Approx. 5 years worth of daily data
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        data.push({
            date: date.toISOString().split('T')[0],
            income: Math.floor(Math.random() * 500) + 100,
            expense: Math.floor(Math.random() * 400) + 50,
        });
    }
    return data;
};

const rawDailyData = generateMockData();

const FinancialChart = () => {
    const chartRef = useRef(null);
    const [view, setView] = useState('daily');
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const chartInstance = useRef(null);

    const filteredData = rawDailyData.filter(entry => {
        const entryDate = new Date(entry.date);
        if (view === 'daily') {
            return entryDate.getFullYear() === selectedYear && entryDate.getMonth() === selectedMonth;
        } else if (view === 'monthly') {
            return entryDate.getFullYear() === selectedYear;
        }
        return true;
    });

    const getChartData = () => {
        if (view === 'daily') {
            return {
                income: filteredData.map(entry => ({ x: entry.date, y: entry.income })),
                expense: filteredData.map(entry => ({ x: entry.date, y: entry.expense })),
            };
        } else if (view === 'monthly') {
            const monthlyAggregates = {};
            filteredData.forEach(entry => {
                const monthKey = entry.date.slice(0, 7);
                if (!monthlyAggregates[monthKey]) {
                    monthlyAggregates[monthKey] = { income: 0, expense: 0, date: `${monthKey}-01` };
                }
                monthlyAggregates[monthKey].income += entry.income;
                monthlyAggregates[monthKey].expense += entry.expense;
            });
            return {
                income: Object.values(monthlyAggregates).map(month => ({ x: month.date, y: month.income })),
                expense: Object.values(monthlyAggregates).map(month => ({ x: month.date, y: month.expense })),
            };
        } else {
            const yearlyAggregates = {};
            rawDailyData.forEach(entry => {
                const yearKey = entry.date.slice(0, 4);
                if (!yearlyAggregates[yearKey]) {
                    yearlyAggregates[yearKey] = { income: 0, expense: 0, date: `${yearKey}-01-01` };
                }
                yearlyAggregates[yearKey].income += entry.income;
                yearlyAggregates[yearKey].expense += entry.expense;
            });
            return {
                income: Object.values(yearlyAggregates).map(year => ({ x: year.date, y: year.income })),
                expense: Object.values(yearlyAggregates).map(year => ({ x: year.date, y: year.expense })),
            };
        }
    };

    const renderChart = () => {
        if (chartInstance.current) chartInstance.current.destroy();
        const ctx = chartRef.current.getContext('2d');
        const { income, expense } = getChartData();

        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                datasets: [
                    {
                        label: 'Income',
                        data: income,
                        backgroundColor: '#3B82F6', // Tailwind's bg-blue-500
                        borderRadius: 8 // Rounded bar edges
                    },
                    {
                        label: 'Expense',
                        data: expense,
                        backgroundColor: '#EC4899', // Tailwind's bg-pink-500
                        borderRadius: 8 // Rounded bar edges
                    },
                ]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: { unit: view === 'yearly' ? 'year' : view === 'monthly' ? 'month' : 'day' },
                    },
                    y: { beginAtZero: true },
                },
                responsive: true,
                plugins: {
                    legend: { display: true }
                },
            }
        });
    };


    useEffect(() => renderChart(), [view, selectedMonth, selectedYear]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-700">
            <div className="flex flex-wrap gap-4 mb-4">
                <select
                    value={view}
                    onChange={e => setView(e.target.value)}
                    className="p-2 rounded-md dark:border-gray-600 bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white"
                >
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>

                {view !== 'yearly' && (
                    <select
                        value={selectedYear}
                        onChange={e => setSelectedYear(parseInt(e.target.value))}
                        className="p-2 rounded-md dark:border-gray-600 bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white"
                    >
                        {[...Array(6)].map((_, i) => {
                            const year = new Date().getFullYear() - 5 + i;
                            return <option key={year} value={year}>{year}</option>;
                        })}
                    </select>
                )}

                {view === 'daily' && (
                    <select
                        value={selectedMonth}
                        onChange={e => setSelectedMonth(parseInt(e.target.value))}
                        className="p-2 rounded-md dark:border-gray-600 bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white"
                    >
                        {[...Array(12)].map((_, i) => (
                            <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                        ))}
                    </select>
                )}
            </div>

            <canvas ref={chartRef} className="w-full"></canvas>
        </div>

    );
};

export default FinancialChart;
