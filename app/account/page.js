'use client'

import React, { useEffect, useState } from 'react'
import DynamicTable from '../components/DynamicTable'
import accoutsData from "./accounts.json"
import { useFilter } from '../Context/FilterContext'
import { fetchAccountList } from '../service/account.service'
import { useAppContext } from '../Context/AppContext'
// import FilterComponent from '../components/FilterComponent'

const Accounts = () => {
    const { filters } = useFilter(); // Retrieve the filters from context
    const { user } = useAppContext()
    const [accountList, setAccountList] = useState([]); // Store the data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAccountsList = async () => {
        try {
            const res = await fetchAccountList(user?._id)
            console.log(res?.data?.accounts, "accounts")
            setAccountList(res?.data?.accounts)
        } catch (error) {
            console.log(error, 'error')
        }
    }
    useEffect(() => {
        if (user) {
            getAccountsList()
        }
    }, [user])

    const columns = [
        {
            "key": "accountType",
            "label": "Account Type"
        },
        {
            "key": "accountName",
            "label": "Account Name"
        },
        {
            "key": "accountNumber",
            "label": "Account Number"
        },
        {
            "key": "balance",
            "label": "Balance"
        },
        {
            "key": "status",
            "label": "Status"
        },
        {
            "key": "updatedAt",
            "label": "Updated At"
        },
        {
            "key": "actions",
            "label": "Actions"
        }
    ]

    // console.log({ columns })
    return (
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && (
                <>
                    {/* <FilterComponent /> */}
                    <DynamicTable
                        data={accountList}
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