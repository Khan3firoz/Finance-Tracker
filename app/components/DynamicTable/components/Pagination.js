import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

const Pagination = ({ totalRows, rowsPerPage, currentPage, onPageChange, onRowsPerPageChange }) => {
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const startRow = (currentPage - 1) * rowsPerPage + 1;
    const endRow = Math.min(currentPage * rowsPerPage, totalRows);

    return (
        <div className="flex items-center gap-4 pt-4 bg-white  text-gray-700 dark:bg-gray-700 dark:text-white">
            {/* Rows Per Page Selection */}
            <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <select
                    value={rowsPerPage}
                    onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                    className=" p-1 bg-white dark:bg-gray-700"
                >
                    {[5, 10, 15, 20].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            {/* Display Current Range */}
            <div className="text-sm w-auto">
                {startRow} - {endRow} of {totalRows}
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center gap-2">
                <div
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 py-1"
                >
                    <CaretLeft />
                </div>
                <div
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1"
                >
                    <CaretRight />
                </div>
            </div>
        </div>
    );
};

export default Pagination;
