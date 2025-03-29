'use client'
import React from 'react'
import RecentTransactions from '../components/RecentTransactions'

const Income = () => {
    return (
        <div>
            <RecentTransactions type="credit" title="Income" />
        </div>
    )
}

export default Income