"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useAppContext } from "../Context/AppContext";
import { useToast } from "../Context/TosterProvider";
import TextBox from "../components/TextBox";
import CustomSelect from "../components/CustomSelect";
import { accountTypeOptions } from "../account/const";
import { createAccount, createTransaction, fetchAccountList } from "../service/account.service";
import storage from "@/utils/storage";
import { fetchCategory } from "../service/category.service";
import { fetchBudgetList } from "../service/budget.service";
import { fetchAllUser } from "../service/user.service";

// Dummy options (Replace these with API data)
const transactionTypeOptions = [
    { label: "Income", value: "credit" },
    { label: "Expense", value: "debit" },
];


const accountOptions = [
    { label: "Main Account", value: "6794f114fb0ba7a3a482625a" },
    { label: "Savings Account", value: "account-id-2" },
];

const budgetOptions = [
    { label: "Monthly Budget", value: "budget-id-1" },
    { label: "Annual Budget", value: "budget-id-2" },
];

const tagOptions = [
    { label: "Food", value: "food" },
    { label: "Monthly", value: "monthly" },
];

const schema = yup.object().shape({
    amount: yup.number().positive("Amount must be positive").required("Amount is required"),
    transactionType: yup.string().required("Transaction Type is required"),
    accountId: yup.string().required("Account is required"),
    categoryId: yup.string().required("Category is required"),
    description: yup.string().required("Description is required"),
    tags: yup.array(),
    isRecurring: yup.boolean(),
    location: yup.string(),
    sharedWith: yup.array(),
    budgetId: yup.string().nullable(),
});

const AddTxnModal = () => {
    const { isAddTxn, setIsAddTxn } = useAppContext();
    const { success, error } = useToast();
    const { user } = useAppContext();
    const [categoryList, setCategoryList] = useState([])
    const [accountList, setAccountList] = useState([])
    const [budgetList, setBudgetList] = useState([])
    const [usersList, setUsersList] = useState([])

    const getCategoryList = async () => {
        try {
            const res = await fetchCategory(user?._id)
            const categoryOptions = res?.data?.categories.map(category => ({
                label: category?.name,
                value: category?._id
            }));
            setCategoryList(categoryOptions)
        } catch (error) {
            console.log(error)
        }
    }
    const getAccountsList = async () => {
        try {
            const res = await fetchAccountList(user?._id)
            const accountOptions = res?.data?.accounts.map(account => ({
                label: account?.accountName,
                value: account?._id
            }));
            setAccountList(accountOptions)
        } catch (error) {
            setAccountList([])
            console.log(error, 'error')
        }
    }
    const getBudgetList = async () => {
        try {
            const res = await fetchBudgetList()
            const budgetOptions = res?.data?.budgets.map(budget => ({
                label: budget?.categoryId?.name,
                value: budget?._id
            }));
            setBudgetList(budgetOptions)
        } catch (error) {
            setBudgetList([])
            console.log(error, 'error')
        }
    }

    const getUsersList = async () => {
        try {
            const res = await fetchAllUser()
            const usersOptions = res?.data?.users.map(user => ({
                label: user?.fullName,
                value: user?._id
            }));
            setUsersList(usersOptions)
        } catch (error) {
            setUsersList([])
            console.log(error, 'error')
        }
    }


    useEffect(() => {
        if (user) {
            getCategoryList()
            getAccountsList()
            getBudgetList()
            getUsersList()
        }
    }, [user])

    const defaultValues = {
        currency: '₹',
        transactionType: "expense",
        isRecurring: false,
    };

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        const tags = data?.tags?.map(tag => tag?.value);
        const sharedWith = data?.sharedWith?.map(user => user?.value);
        const reqBody = {
            ...data,
            tags,
            sharedWith,
            userId: user?._id,
        };

        try {
            const res = await createTransaction(reqBody);
            success(res?.message);
            reset();
            setIsAddTxn(false);
        } catch (err) {
            error(err?.message);
        }
    };

    if (!isAddTxn) return null;

    return (
        <motion.div
            id="add-transaction-modal"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-[1000px]"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
            >
                <h2 className="text-xl font-semibold mb-4 text-gray-950">Add Transaction</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Transaction Type and Amount */}
                    <div className="grid grid-cols-2 gap-4">
                        <CustomSelect
                            name="transactionType"
                            control={control}
                            options={transactionTypeOptions}
                            error={errors.transactionType}
                        />
                        <TextBox register={register} name="amount" errors={errors} placeholder="Enter amount" />
                    </div>

                    {/* Account and Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <CustomSelect
                            name="accountId"
                            control={control}
                            options={accountList}
                            error={errors.accountId}
                            placeholder="Select Account"
                        />
                        <CustomSelect
                            name="categoryId"
                            control={control}
                            options={categoryList}
                            error={errors.categoryId}
                            placeholder="Select Category"
                        />
                    </div>



                    {/* Tags and Recurring */}
                    <div className="grid grid-cols-2 gap-4">
                        <CustomSelect
                            name="tags"
                            control={control}
                            options={tagOptions}
                            isMulti
                            error={errors.tags}
                        />
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" {...register("isRecurring")} />
                            <span className="text-gray-700">Recurring Transaction</span>
                        </div>
                    </div>

                    {/* Location and Shared With */}
                    <div className="grid grid-cols-2 gap-4">
                        <TextBox register={register} name="location" errors={errors} placeholder="Enter location (optional)" />
                        <CustomSelect
                            name="sharedWith"
                            control={control}
                            options={usersList}
                            isMulti
                            error={errors.sharedWith}
                            placeholder="Select Shared With (Optional)"
                        />
                    </div>

                    {/* Budget (Optional) */}
                    <CustomSelect
                        name="budgetId"
                        control={control}
                        options={budgetList}
                        error={errors.budgetId}
                    />
                    {/* Description */}
                    <TextBox register={register} name="description" errors={errors} placeholder="Enter description" />

                    {/* Buttons */}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsAddTxn(false)}
                            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Add Transaction
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddTxnModal;
