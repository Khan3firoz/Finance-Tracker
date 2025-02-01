'use client'
import { ArrowDown, ArrowUp, DotsThreeVertical } from '@phosphor-icons/react/dist/ssr';
import React, { useState } from 'react';
import Pagination from './components/Pagination';

export default function DynamicTable({ sortable = false, data }) {
    const [tableData, setTableData] = useState(data || []);
    const [menuOpen, setMenuOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({
        key: 'id',
        direction: 'asc', // 'asc' or 'desc'
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalRows = data.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const [columnVisibility, setColumnVisibility] = useState(
        data && data.length > 0
            ? Object.keys(data[0]).reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {})
            : {}
    );

    const columns = data?.length > 0 ? Object.keys(data[0]).map((key) => ({
        key: key,
        label: key.replace(/([A-Z])/g, ' $1').toUpperCase(), // Optionally, format column label
    })) : [];

    const handleSort = (key) => {
        if (!sortable) return;
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setTableData(sortedData);
    };

    return (
        <div className="flex flex-col dark:bg-gray-700 dark:text-white">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-light border-collapse border">
                    <thead className=" font-medium dark:border-neutral-500">
                        <tr className='text-gray-400'>
                            {columns.map((col) => (
                                <th
                                    scope="col"
                                    key={col.key}
                                    className={`px-6 py-4 ${sortable && 'cursor-pointer'} w-auto whitespace-nowrap text-left border`}
                                    onClick={() => handleSort(col.key)}
                                >
                                    <div className='flex items-center gap-2'>
                                        {col.label} {sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? <ArrowUp weight='bold' size={16} /> : <ArrowDown weight='bold' size={16} />)}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.map((row) => (
                            <tr key={row.id} className=' font-medium dark:border-neutral-500'>
                                {columns.map((col) => (
                                    <td key={col.key} className="whitespace-nowrap px-6 py-4">
                                        {row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-end'>
                <Pagination
                    totalRows={totalRows}
                    rowsPerPage={rowsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    onRowsPerPageChange={(size) => {
                        setRowsPerPage(size);
                        setCurrentPage(1);
                    }}
                />
            </div>

        </div>
    );
}
