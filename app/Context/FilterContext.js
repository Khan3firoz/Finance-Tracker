import React, { createContext, useContext, useState } from "react";

// Create Filter Context
const FilterContext = createContext();

// Context Provider Component
export const FilterProvider = ({ children }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    // Function to toggle filters dynamically
    const toggleFilter = (filter) => {
        setSelectedFilters((prevFilters) =>
            prevFilters.includes(filter)
                ? prevFilters.filter((f) => f !== filter)
                : [...prevFilters, filter]
        );
    };

    // Function to clear all filters
    const clearFilters = () => setSelectedFilters([]);

    return (
        <FilterContext.Provider value={{ selectedFilters, toggleFilter, clearFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

// Custom Hook to use the context
export const useFilter = () => useContext(FilterContext);
