'use client'
import React, { useState, useEffect } from 'react'

import mudules from "../../DummyData/modules.json"
import Card from '../Card'
import accountsummary from "../../DummyData/accountsummary.json"
import HorizontalBarChart from '../HorizontalBarChart'
import RecentTransactions from '../RecentTransactions'
import { House } from '@phosphor-icons/react/dist/ssr'
import ComboChart from '../ComboChart'
import FloatingActionButton from '../FloatingActionButton'
import ExpenceModal from '@/app/Modal/AddExpenceModal'
import { useExpenceContext } from '@/app/Context/ExpenceContext'
import { fetchUserSummry } from '@/app/service/user.service'
import CategorySpentChart from '../CategoryHorizontalBar'

const Content = () => {
  // const { isOpen, handleClosed } = useExpenceContext();
  const [userSummary, setUserSummary] = useState([])

  const getUserSummary = async () => {
    try {
      const res = await fetchUserSummry()
      setUserSummary(res?.data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(userSummary, "userSummary")

  useEffect(() => {
    getUserSummary()
  }, [])
  return (
    <div className="flex-1 p-1 sm:p-3">
      <div className="container mx-auto flex items-center dark:text-gray-100 space-x-1 sm:space-x-2 px-1 sm:px-2">
        <House size={24} className="sm:w-8 sm:h-8" />
        <h1 className="text-lg sm:text-2xl font-medium dark:text-white">Dashboard</h1>
      </div>

      <div className="container mx-auto p-1 sm:p-2 space-y-2 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          <Card icon='income' title='Income' amount={userSummary?.totalIncome} />
          <Card icon='expense' title='Expense' amount={userSummary?.totalExpense} />
          <Card icon='wallet' title='Balance' amount={userSummary?.netAmount} />
        </div>

        <div className="space-y-2 sm:space-y-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-1 sm:p-2">
            <CategorySpentChart />
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-1 sm:p-2">
            <ComboChart />
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg">
            <RecentTransactions />
          </div>
        </div>

        <div className="fixed bottom-4 right-4 z-50">
          <FloatingActionButton />
        </div>
        {/* {isOpen && <ExpenceModal />} */}
      </div>
    </div>
  )
}

export default Content