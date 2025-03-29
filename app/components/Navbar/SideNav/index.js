'use client'
import React, { useState, useEffect, useRef } from 'react'
import './SideNav.scss'
import { Gear, HourglassMedium, List, SignOut, X } from '@phosphor-icons/react/dist/ssr'
import { ArrowDown, ArrowsLeftRight, ArrowUp, User, Subscription, ArrowClockwise, Target, House } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { Bank } from '@phosphor-icons/react';
import { usePathname, useRouter } from 'next/navigation';
import { logoutUser } from '@/app/service/user.service';
import storage from '@/utils/storage';
import { useToast } from '@/app/Context/TosterProvider';

function SideNav() {
    const pathname = usePathname(); // Get current path
    const { error, success } = useToast()
    const routes = useRouter()
    const hideSidebar = pathname === "/login" || pathname === "/signup";
    const [openMenu, setOpenMenu] = useState(false)
    const sidebarRef = useRef(null) // Reference to sidebar container

    // Function to toggle the menu
    function handleToggleMenu() {
        setOpenMenu((prev) => !prev)
    }

    // Function to close the sidebar when a nav item is clicked
    const handleNavClick = () => {
        setOpenMenu(false)
    }

    // Function to close sidebar when clicking outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setOpenMenu(false)
            }
        }

        if (openMenu) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [openMenu])

    const handleLogout = async () => {
        try {
            await logoutUser()
            storage.signOut()
            routes.push('/login')
            setOpenMenu(false) // Close menu on logout
        } catch (err) {
            console.log(err, "err")
            error(err?.message)
        }
    }

    if (hideSidebar) {
        return null
    }

    return (
        <div className='none'>
            <input type="checkbox" id="menu-toggle" checked={!openMenu} readOnly />
            <div className="menu dflex" ref={sidebarRef}>
                <div id="logoCSS3" className="text-center flex items-start gap-3 flex-col mt-12 ml-8">
                    <Bank size={50} className="text-gray-800 dark:text-white" weight="light" />
                    <span className="text-xl font-bold dark:text-white text-gray-700">Finance Tracker</span>
                </div>
                <div className="elements-container dflex ml-6">
                    <div className="element dark:text-gray-100 flex items-center">
                        <House size={20} className="mr-2" />
                        <Link href="/" onClick={handleNavClick}>
                            Dashboard
                        </Link>
                    </div>
                    <div className="element dark:text-gray-100 flex items-center">
                        <User size={20} className="mr-2" />
                        <Link href="/account" onClick={handleNavClick}>
                            Account
                        </Link>
                    </div>
                    <div className="element dark:text-gray-100 flex items-center">
                        <ArrowDown size={20} className="mr-2" />
                        <Link href="/income" onClick={handleNavClick}>
                            Income
                        </Link>
                    </div>
                    <div className="element dark:text-gray-100 flex items-center">
                        <ArrowUp size={20} className="mr-2" />
                        <Link href="/expense" onClick={handleNavClick}>
                            Expense
                        </Link>
                    </div>
                    {/* <div className="element dark:text-gray-100 flex items-center">
                        <ArrowClockwise size={20} className="mr-2" />
                        <Link href="/subscription" onClick={handleNavClick}>
                            Subscription
                        </Link>
                    </div> */}
                    {/* <div className="element dark:text-gray-100 flex items-center">
                        <Target size={20} className="mr-2" />
                        <Link href="/goals" onClick={handleNavClick}>
                            Goals
                        </Link>
                    </div> */}
                    <div className="element dark:text-gray-100 flex items-center ">
                        <SignOut size={20} className="mr-2" />
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
                <div className="menu-container-btn">
                    <div className="menu-toggle-btn">
                        <label className="menu-btn text-center" htmlFor="menu-toggle" onClick={handleToggleMenu}>
                            <X className='fa-close' />
                            <List className='fa-bars' />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideNav;
