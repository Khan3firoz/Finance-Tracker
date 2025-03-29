'use client'
import React from 'react'
import RecentTransactions from '../components/RecentTransactions'

const Expence = () => {
    return (
        <div>
            <RecentTransactions type="debit" title="Expense" />
        </div>
    )
}

export default Expence