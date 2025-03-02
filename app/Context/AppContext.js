'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUserDetails } from "../service/user.service";
import { fetchCategory } from "../service/category.service";
import storage from "@/utils/storage";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // const [user, setUser] = useState(null); // Example state for a user
    const [isAddCat, setIsAddCat] = useState(false)
    const [isAddTxn, setIsAddTxn] = useState(false)
    const user = storage.getUser()

    const getCategoryList = async () => {
        try {
            const res = await fetchCategory(user?._id)
            console.log({ res })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user) {
            getCategoryList()
        }
    }, [user])

    const handleAddCategory = () => {
        setIsAddCat(true)
    }

    const handleAddTransaction = () => {
        setIsAddTxn(true)
    }

    return (
        <AppContext.Provider value={{
            user, isAddCat, setIsAddCat, handleAddCategory, handleAddTransaction, isAddTxn, setIsAddTxn
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
