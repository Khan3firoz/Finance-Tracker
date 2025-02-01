'use client'

import React, { useState } from 'react'
import DynamicTable from '../components/DynamicTable'
import accoutsData from "./accounts.json"
import { useFilter } from '../Context/FilterContext'
// import FilterComponent from '../components/FilterComponent'

const Accounts = () => {
    const { filters } = useFilter(); // Retrieve the filters from context
    const [data, setData] = useState([]); // Store the data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(accoutsData, "accoutsData")

    // Extract columns from the keys of the first item in data
    const columns = accoutsData.length > 0 ? Object.keys(accoutsData[0]).map((key) => ({
        key: key,
        label: key.replace(/([A-Z])/g, ' $1').toUpperCase(), // Optionally, format column label
    })) : [];
    return (
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && (
                <>
                    {/* <FilterComponent /> */}
                    <DynamicTable
                        data={accoutsData}
                        columns={columns} // Pass dynamically generated columns here
                        filters={filters}
                        sortable  //Make sortable
                    />
                </>

            )}
        </div>
    )
}

export default Accounts