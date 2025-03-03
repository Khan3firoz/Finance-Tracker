import { useAppContext } from "@/app/Context/AppContext";
import { fetchAllTransaction } from "@/app/service/account.service";
import { Coffee, HouseLine, Lightning, ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const iconMapping = {
    coffee: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Coffee className="h-6 w-6" color="red" />
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
    const { user } = useAppContext()

    const [allTransactions, setAllTransactions] = useState([])

    const getAllTransactions = async () => {

        try {
            const res = await fetchAllTransaction()
            setAllTransactions(res?.data?.transactions)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user) {
            getAllTransactions()
        }
    }, [user])

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-700">
            {/* Transactions Card */}
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-white">Recent Transactions</h2>
            <div className="space-y-4">
                {allTransactions.map((transaction) => (
                    <div
                        key={transaction._id}
                        className="flex justify-between items-center p-4 rounded-lg shadow-sm transition "
                    >
                        <div className="flex items-center space-x-4">
                            <span
                                className="text-2xl text-gray-700 dark:text-white"
                                role="img"
                                aria-label={transaction.categoryId?.name}
                            >
                                {iconMapping[transaction.categoryId?.name?.toLowerCase()]}
                                {/* {transaction?.categoryId?.icon} */}
                            </span>
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-white">{transaction?.categoryId?.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{transaction?.description}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`text-sm font-medium ${transaction?.transactionType === 'debit' ? 'text-red-500' : 'text-green-500'}`}>{transaction.amount}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{dayjs(transaction?.date)?.format("D MMMM YYYY HH:mm")}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
