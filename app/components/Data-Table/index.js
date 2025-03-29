import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';

// Component for the action menu for each row
const RowActionMenu = ({ row, actions }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }} ref={menuRef}>
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the row click
                    setOpen((prev) => !prev);
                }}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    padding: '4px',
                }}
            >
                ⋮
            </button>
            {open && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        background: '#fff',
                        border: '1px solid #ccc',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        zIndex: 1000,
                        minWidth: '100px',
                    }}
                >
                    {actions &&
                        actions.map((action, index) => (
                            <div
                                key={index}
                                style={{ padding: '8px', cursor: 'pointer' }}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the row click
                                    if (action.onClick) {
                                        action.onClick(row.original);
                                    }
                                    setOpen(false);
                                }}
                            >
                                {action.label}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export const Datatable = ({
    columns,
    data,
    showAction = false,
    actionOptions = [],
    onRowClick, // Optional row click handler
}) => {
    // Extend columns to add the action column if required.
    const extendedColumns = useMemo(() => {
        if (showAction) {
            return [
                ...columns,
                {
                    id: 'actions',
                    header: 'Actions',
                    cell: ({ row }) => <RowActionMenu row={row} actions={actionOptions} />,
                    meta: { align: 'center' },
                },
            ];
        }
        return columns;
    }, [columns, showAction, actionOptions]);

    const table = useReactTable({
        data,
        columns: extendedColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <table
            border="1"
            cellPadding="5"
            style={{
                borderCollapse: 'collapse',
                width: '100%',
                textAlign: 'center',
            }}
        >
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                style={{ textAlign: header.column.columnDef.meta?.align || 'center' }}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr
                        key={row.id}
                        className={onRowClick ? 'hover:bg-gray-100 cursor-pointer' : ''}
                        onClick={() => onRowClick && onRowClick(row.original)}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <td
                                key={cell.id}
                                style={{ textAlign: cell.column.columnDef.meta?.align || 'center' }}
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
