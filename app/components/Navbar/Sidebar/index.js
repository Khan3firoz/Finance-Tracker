import { ArrowDown, ArrowsLeftRight, ArrowUp, User, Subscription, ArrowClockwise, Target, House } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

const Sidebar = () => {
    return (
        <div >
            <div className="w-64 h-full text-gray-700 pl-8 p-6">
                <ul>
                    <li className="mb-4 flex items-center dark:text-gray-100 ">
                        <House size={20} className="mr-2" />
                        <Link href="/">
                            Dashboard
                        </Link>
                    </li>
                    <li className="mb-4 flex items-center dark:text-gray-100 ">
                        <User size={20} className="mr-2" />
                        <Link href="/about">
                            Account
                        </Link>
                    </li>
                    <li className="mb-4 flex items-center dark:text-gray-100">
                        <ArrowDown size={20} className="mr-2" />
                        <Link href="/services">
                            Income
                        </Link>
                    </li>
                    <li className="mb-4 flex items-center dark:text-gray-100">
                        <ArrowUp size={20} className="mr-2" />
                        <Link href="/contact">
                            Expense
                        </Link>
                    </li>
                    <li className="mb-4 flex items-center dark:text-gray-100">
                        <ArrowsLeftRight size={20} className="mr-2" />
                        <Link href="/contact">
                            Transer
                        </Link>
                    </li>
                    <li className="mb-4 flex items-center dark:text-gray-100">
                        <ArrowClockwise size={20} className="mr-2" />
                        <Link href="/contact">
                            Subscription
                        </Link>
                    </li>
                    <li className="mb-4 flex items-center dark:text-gray-100">
                        <Target size={20} className="mr-2" />
                        <Link href="/contact">
                            Goals
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
