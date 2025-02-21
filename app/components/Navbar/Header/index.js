'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Bank, Bell, Moon, Sun, User } from "@phosphor-icons/react/dist/ssr";
// import { Avatar } from '@radix-ui/themes';
import * as Avatar from '@radix-ui/react-avatar';

const Header = ({ theme, toggleTheme }) => {

    return (
        <header className="">
            <nav className="container mx-auto flex items-center justify-between p-4">
                {/* Left side: Logo and Title */}
                <div className="flex items-center space-x-2">
                    {/* <Bank size={50} className="" weight="light" /> */}
                    <Bank size={50} className="text-gray-800 dark:text-white" weight="light" />
                    <span className="text-xl font-bold dark:text-white text-gray-700">Finance Tracker</span>
                </div>

                {/* Right side: User Info, Notification, and Theme Toggle */}
                <div className="flex items-center space-x-4">
                    {/* User Avatar and Name */}
                    <div className="flex items-center space-x-2">
                        <Avatar.Root className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                            <Avatar.Image
                                className="w-full h-full object-cover"
                                src="/avatar-placeholder.png"
                                alt="User Avatar"
                            />
                            <Avatar.Fallback
                                className="flex items-center justify-center w-full h-full dark:text-gray-700 dark:bg-text-white dark:bg-white bg-gray-700 text-white text-sm font-medium"
                                delayMs={400}
                            >
                                FK
                            </Avatar.Fallback>
                        </Avatar.Root>
                        <span className="text-gray-700 dark:text-gray-100">Firoz Khan</span>
                    </div>
                    {/* Notification Icon */}
                    <button
                        onClick={() => console.log("Click")}
                        className="flex items-center justify-center rounded  focus:outline-none dark:hover:bg-gray-700"
                        aria-label="Notifications"
                    >
                        <Bell className="w-6 h-6 text-gray-700 dark:text-gray-100" />
                    </button>
                    {/* Dark/Light Mode Toggle */}
                    {console.log(theme, "theme")}
                    <button
                        onClick={() => console.log("Click")}
                        className="flex items-center justify-center rounded focus:outline-none dark:hover:bg-gray-700"
                        // aria-label="Toggle Dark Mode"
                    >
                        {theme === 'light' ? (
                            <Moon className="text-gray-700 w-6 h-6" />
                        ) : (
                            <Sun className="text-yellow-400 w-6 h-6" />
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
