'use client'
import { Sun, Moon } from "@phosphor-icons/react/dist/ssr";
import { useAppContext } from "@/app/Context/AppContext";

const Header = ({ theme, toggleTheme }) => {
    const { user } = useAppContext();

    return (
        <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-4">
                <span className="hidden sm:block text-xl font-bold dark:text-white text-gray-700">Finance Tracker</span>
            </div>
            <div className="flex items-center space-x-4">
                <span className="hidden sm:block text-gray-700 dark:text-gray-100">{user?.fullName}</span>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </div>
    );
};

export default Header;