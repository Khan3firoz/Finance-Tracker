import { Coffee, HouseLine, Lightning, ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const transactions = [
    {
        id: 1,
        name: "Starbucks Coffee",
        category: "Food & Drink",
        amount: "$4.50",
        date: "Today",
        icon: "coffee", // Coffee icon
    },
    {
        id: 2,
        name: "Target",
        category: "Shopping",
        amount: "$65.99",
        date: "Yesterday",
        icon: "shopping", // Shopping cart icon
    },
    {
        id: 3,
        name: "Rent Payment",
        category: "Housing",
        amount: "$1200.00",
        date: "1st Mar",
        icon: "house", // House icon
    },
    {
        id: 4,
        name: "Electric Bill",
        category: "Utilities",
        amount: "$85.50",
        date: "1st Mar",
        icon: "electicity", // Lightning bolt icon
    },
];

const iconMapping = {
    coffee: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Coffee className="h-6 w-6 " />
        </div>
    ),
    house: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <HouseLine className="h-6 w-6 " />
        </div>
    ),
    shopping: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <ShoppingCart className="h-6 w-6 " />
        </div>
    ),
    electicity: (
        <div className="flex items-center justify-center  bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Lightning className="h-6 w-6 " />
        </div>
    ),
};


const RecentTransactions = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-700">
            {/* Transactions Card */}
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-white">Recent Transactions</h2>
            <div className="space-y-4">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex justify-between items-center p-4 rounded-lg shadow-sm transition "
                    >
                        <div className="flex items-center space-x-4">
                            <span
                                className="text-2xl text-gray-700 dark:text-white"
                                role="img"
                                aria-label={transaction.category}
                            >
                                {iconMapping[transaction?.icon]}
                            </span>
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-white">{transaction.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.category}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-red-500 ">{transaction.amount}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
