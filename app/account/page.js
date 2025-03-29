'use client'

import React, { useEffect, useState } from 'react'
import DynamicTable from '../components/DynamicTable'
import accoutsData from "./accounts.json"
import { useFilter } from '../Context/FilterContext'
import { deleteAccount, fetchAccountList } from '../service/account.service'
import { useAppContext } from '../Context/AppContext'
import { createColumnHelper } from '@tanstack/react-table';
import { Datatable } from '../components/Data-Table'
import { Delete, Edit, Pencil, Trash2 } from 'lucide-react'
import { useToast } from '../Context/TosterProvider'
// import FilterComponent from '../components/FilterComponent'

const Accounts = () => {
    const { filters } = useFilter(); // Retrieve the filters from context
    const { user } = useAppContext()
    const [accountList, setAccountList] = useState([]); // Store the data
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    // const { success, error } = useToast()

    const getAccountsList = async () => {
        try {
            const res = await fetchAccountList(user?._id)
            console.log(res?.data?.accounts, "accounts")
            setAccountList(res?.data?.accounts)
        } catch (err) {
            console.log(error, 'error')
        }
    }
    useEffect(() => {
        if (user) {
            getAccountsList()
        }
    }, [user])

    const columnHelper = createColumnHelper();

    const accountsColumns = [
        columnHelper.accessor('accountName', {
            header: 'Account Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('accountNumber', {
            header: 'Account Number',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('accountType', {
            header: 'Account Type',
            cell: info => info.getValue(),
        }),

        columnHelper.accessor('balance', {
            header: 'Balance (₹)',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('createdAt', {
            header: 'Created At',
            cell: info => new Date(info.getValue()).toLocaleString(),
        }),
    ];

    // const delAccount = async (id) => {
    //     debugger
    //     try {
    //         const res = await deleteAccount(id)
    //         console.log(res, "res")
    //         // success(res?.message)
    //     } catch (error) {
    //         // error(error?.message)
    //     }
    // }
    const actionOptions = [
        {
            label: <div className='flex justify-center items-center gap-2'>
                <Pencil size={16} /> Edit
            </div>,
            onClick: (rowData) => alert(`Editing ${rowData.accountName}`),
        },
        // {
        //     label: <div className='flex justify-center items-center gap-2'>
        //         <Trash2 size={16} /> Delete
        //     </div>,
        //     onClick: (rowData) => delAccount(rowData?._id),
        // }
    ];

    return (
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
            {loading && <p className="text-center">Loading...</p>}
            {/* {error && <p className="text-center text-red-500">{error}</p>} */}
            {!loading && (

                <Datatable
                    data={accountList}
                    columns={accountsColumns}
                    showAction={true}
                    actionOptions={actionOptions}
                />
            )}
        </div>
    )
}

export default Accounts