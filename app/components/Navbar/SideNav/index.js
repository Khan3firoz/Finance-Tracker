import React, { useState } from 'react'
import './SideNav.scss'
import { Gear, HourglassMedium, List, SignOut, X } from '@phosphor-icons/react/dist/ssr'
import { ArrowDown, ArrowsLeftRight, ArrowUp, User, Subscription, ArrowClockwise, Target, House } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { Bank } from '@phosphor-icons/react';


function SideNav() {

    const [openMenu, setOpenMenu] = useState(false)
    function handleToggeleMenu() {
        setOpenMenu(!openMenu)
    }

    return (
        <div>
            <input type="checkbox" id="menu-toggle" checked={!openMenu} />
            <div className="menu dflex">
                <div id="logoCSS3" className="text-center flex items-start gap-3 flex-col mt-12 ml-8">
                    <Bank size={50} className="text-gray-800 dark:text-white" weight="light" />
                    <span className="text-xl font-bold dark:text-white text-gray-700">Finance Tracker</span>
                </div>
                <div className="elements-container dflex ml-6">
                    <a className="element dark:text-gray-100 flex items-center">
                        <House size={20} className="mr-2" />
                        <Link href="/">
                            Dashboard
                        </Link>
                    </a>
                    <a className="element dark:text-gray-100 flex items-center">
                        <User size={20} className="mr-2" />
                        <Link href="/account">
                            Account
                        </Link>
                    </a>
                    <a className="element dark:text-gray-100 flex items-center">
                        <ArrowDown size={20} className="mr-2" />
                        <Link href="/income">
                            Income
                        </Link>
                    </a>
                    <a className="element dark:text-gray-100 flex items-center">
                        <ArrowUp size={20} className="mr-2" />
                        <Link href="/expense">
                            Expense
                        </Link>
                    </a>

                    <a className="element dark:text-gray-100 flex items-center">
                        <ArrowClockwise size={20} className="mr-2" />
                        <Link href="/subscription">
                            Subscription
                        </Link>
                    </a>
                    <a className="element dark:text-gray-100 flex items-center">
                        <Target size={20} className="mr-2" />
                        <Link href="/goals">
                            Goals
                        </Link>
                    </a>
                    <a className="element dark:text-gray-100 flex items-center ">
                        <SignOut size={20} className="mr-2" />
                        <button>
                            Logout
                        </button>
                    </a>
                </div>
                <div className="menu-container-btn">
                    <div className="menu-toggle-btn">
                        <label className="menu-btn text-center" htmlFor="menu-toggle" onClick={handleToggeleMenu}>
                            <X className='fa-close' />
                            <List className='fa-bars' />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideNav