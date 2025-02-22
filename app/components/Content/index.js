import React from 'react'

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

const Content = () => {
  // const { isOpen, handleClosed } = useExpenceContext();
  return (
    <div className="flex-1 p-6">
      <div className="container mx-auto flex items-center dark:text-gray-100 space-x-4 px-4">
        <House size={40} />
        <h1 className="text-3xl font-semibold dark:text-white">Dashboard</h1>
      </div>

      {/* Container holding multiple cards */}
      <div className="container mx-auto p-4 space-y-6">
        {/* Grid layout with responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {accountsummary?.map((item) => (<Card key={item?.id} icon={item?.icon} title={item?.name} amount={item?.amount} />))}
        </div>
        <HorizontalBarChart />
        <ComboChart />
        <RecentTransactions />
        <FloatingActionButton />
        {/* {isOpen && <ExpenceModal />} */}
      </div>
    </div>
  )
}

export default Content