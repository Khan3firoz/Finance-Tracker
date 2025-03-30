import { useAppContext } from "@/app/Context/AppContext";
import { fetchAllTransaction } from "@/app/service/account.service";
// import { Coffee, HouseLine, Lightning, ShoppingCart, CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
    Coffee,
    HouseLine,
    ShoppingCart,
    Lightning,
    Bank,
    FileText,
    Bag,
    Ticket,
    Heart,
    Briefcase,
    Calendar,
    ShoppingBag,
    ShieldCheck,
    Stethoscope,
    GraduationCap,
    CurrencyCircleDollar,
    Percent,
    ForkKnife,
    Plug,
    Car,
    ChartLineUp,
    Gift,
    CaretLeft,
    CaretRight
} from "@phosphor-icons/react";
import { Basket, Coins, FilmSlate, Shield } from "@phosphor-icons/react/dist/ssr";
import { Dumbbell } from "lucide-react";

// Normalize function to create consistent keys
const normalizeKey = (key) => key?.toLowerCase()?.replace(/[\s,&]+/g, "_");

// Mapping of categories to icons
const iconMapping = {
    [normalizeKey("Rental Income")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Bank className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Taxes")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Coins className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Shopping")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <ShoppingCart className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Entertainment")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <FilmSlate className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Fitness & Personal Care")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Dumbbell className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Business Profits")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Briefcase className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Weddings & Events")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Gift className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Groceries")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Basket className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Insurance")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Shield className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Healthcare")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Stethoscope className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Children's Education & School Fees")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <GraduationCap className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Salary & Wages")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <CurrencyCircleDollar className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Interest Income")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Coins className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Dining Out")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <ForkKnife className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Utilities & Bills")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Plug className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Transportation")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Car className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Stocks, Mutual Funds & ETFs")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <ChartLineUp className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Others")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Lightning className="h-6 w-6" />
        </div>
    ),
    [normalizeKey("Gifts & Donations")]: (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-3 rounded-full">
            <Heart className="h-6 w-6" />
        </div>
    ),
};

const RecentTransactions = ({ type, title = "Recent Transactions" }) => {
    const { user } = useAppContext();
    const [allTransactions, setAllTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5;

    const getAllTransactions = async () => {
        try {
            const res = await fetchAllTransaction(type);
            setAllTransactions(res?.data?.transactions || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) {
            getAllTransactions();
        }
    }, [user]);

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = allTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
    const totalPages = Math.ceil(allTransactions.length / transactionsPerPage);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-700 relative">
            {/* Title */}
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-white">{title}</h2>

            {/* Transactions List */}
            {currentTransactions.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-300 text-center">No transactions available.</p>
            ) : (
                    <div className="space-y-4">
                        {currentTransactions.map((transaction) => (
                            <div key={transaction._id} className="flex justify-between items-center p-4 rounded-lg shadow-sm transition">
                                <div className="flex items-center space-x-4">
                                    <span className="text-2xl text-gray-700 dark:text-white">
                                        {iconMapping[normalizeKey(transaction.categoryId?.name)] || transaction.categoryId?.icon || "💰"}
                                    </span>
                                <div>
                                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                                        {transaction?.categoryId?.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {transaction?.description}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-medium ${transaction?.transactionType === "debit" ? "text-red-500" : "text-green-500"}`}>
                                    {transaction.amount}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {dayjs(transaction?.date)?.format("D MMMM YYYY HH:mm")}
                                </p>
                            </div>
                        </div>
                    ))}
                    </div>
            )}

            {/* Pagination (Bottom Right) */}
            {totalPages > 1 && (
                <div className="flex justify-end items-center mt-6 space-x-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-full transition ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                            }`}
                    >
                        <CaretLeft className="h-5 w-5" />
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 text-sm rounded-md transition ${currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-full transition ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                            }`}
                    >
                        <CaretRight className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecentTransactions;
