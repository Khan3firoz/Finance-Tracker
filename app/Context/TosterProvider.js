// components/ToastProvider.js
import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create Context
const ToastContext = createContext();

// ToastProvider Component
export const ToastProvider = ({ children }) => {
    const showToast = {
        success: (message, options) => toast.success(message, options),
        error: (message, options) => toast.error(message, options),
        info: (message, options) => toast.info(message, options),
        warning: (message, options) => toast.warn(message, options),
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
        </ToastContext.Provider>
    );
};

// Custom Hook to use the Toast Context
export const useToast = () => {
    return useContext(ToastContext);
};
