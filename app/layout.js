'use client'
import React, { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./Context/AppContext";
import { FilterProvider } from "./Context/FilterContext";
import Header from "./components/Navbar/Header";
import Sidebar from "./components/Navbar/Sidebar";
import { usePathname } from "next/navigation";
import SideNav from "./components/Navbar/SideNav";
import { ExpenceProvider } from "./Context/ExpenceContext";
import { ToastProvider } from "./Context/TosterProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {

  const pathname = usePathname(); // Get current route

  // Define routes where Header and Sidebar should be hidden
  const authRoutes = ["/login", "/signup"];
  const isAuthPage = authRoutes.includes(pathname);
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-700  min-h-screen overflow-auto`}
      >
        <AppProvider>
          <ToastProvider>
          <FilterProvider>
            <ExpenceProvider>
            <SideNav />
            {!isAuthPage ? (
              <div className=" mx-auto h-auto p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow  min-h-screen overflow-auto">
                <Header theme={theme} toggleTheme={toggleTheme} />
                <div className="flex w-full ">
                  <main className="p-4 w-full mx-10">{children}</main>
                </div>
              </div>
            ) : (
                <main className="min-h-screen overflow-auto">{children}</main>
                )}
            </ExpenceProvider>
            </FilterProvider>
          </ToastProvider>
        </AppProvider>
      </body>
    </html>
  );
}
