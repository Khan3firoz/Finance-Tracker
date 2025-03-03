import React from 'react';
import { ArrowDownRight, ArrowUpRight, Wallet, CurrencyInr } from '@phosphor-icons/react/dist/ssr';

const iconMapping = {
    income: (
        <div className="flex items-center justify-center bg-green-100 p-3 rounded-full">
            <ArrowDownRight className="h-6 w-6 text-green-500" />
        </div>
    ),
    expense: (
        <div className="flex items-center justify-center bg-red-100 p-3 rounded-full">
            <ArrowUpRight className="h-6 w-6 text-red-500" />
        </div>
    ),
    wallet: (
        <div className="flex items-center justify-center bg-blue-100 p-3 rounded-full">
            <Wallet className="h-6 w-6 text-blue-500" />
        </div>
    ),
};

const Card = ({ icon, title, amount }) => {
    // Define the color for the amount based on the icon
    const amountColor = icon === "income" ? "text-green-500" : icon === "expense" ? "text-red-500" : "text-blue-500";

    return (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg dark:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-xl transition-all duration-300">
            <div className="flex  items-center justify-between space-y-4">
                <div className="flex items-center justify-between space-x-6">
                    {/* Icon Mapping */}
                    {iconMapping[icon]}
                    <div>
                        <p className="text-base sm:text-lg md:text-xl text-center flex items-center space-x-1 dark:text-white">
                            {title}
                        </p>
                        <p className="text-base sm:text-lg md:text-xl text-center flex items-center space-x-1">
                            {/* Currency Symbol with Amount */}
                            <CurrencyInr className={`h-5 w-5 ${amountColor}`} />
                            <span className={`${amountColor}`}>{amount}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
