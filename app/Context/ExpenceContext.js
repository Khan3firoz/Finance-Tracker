"use client";
import React, { createContext, useContext, useState } from "react";

const ExpenceContext = createContext();

export const ExpenceProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClosed = () => setIsOpen(false);

    return (
        <ExpenceContext.Provider value={{ isOpen, handleOpen, handleClosed }}>
            {children}
        </ExpenceContext.Provider>
    );
};

export const useExpenceContext = () => {
    const context = useContext(ExpenceContext);
    return context;
};
