"use client";

import { useState } from "react";
import Draggable from "react-draggable";
import { FiMenu, FiHome, FiUser, FiSettings } from "react-icons/fi";

const FloatingMenu = () => {
    const [open, setOpen] = useState(false);

    return (
        <Draggable>
            <div className="fixed bottom-10 right-10 z-50">
                {/* Main Floating Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="w-14 h-14 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-lg transition-transform duration-300"
                >
                    <FiMenu size={24} />
                </button>

                {/* Circular Nav Items */}
                {open && (
                    <div className="absolute w-40 h-40 -top-32 -right-10 flex justify-center items-center">
                        <div className="relative w-full h-full">
                            {[{ icon: FiHome, link: "/" }, { icon: FiUser, link: "/profile" }, { icon: FiSettings, link: "/settings" }].map(
                                (item, index) => {
                                    const angle = (index * Math.PI) / 2;
                                    const x = 50 * Math.cos(angle);
                                    const y = -50 * Math.sin(angle);

                                    return (
                                        <a
                                            key={index}
                                            href={item.link}
                                            className="absolute w-12 h-12 bg-gray-800 text-white flex items-center justify-center rounded-full shadow-md transition-all duration-300"
                                            style={{ transform: `translate(${x}px, ${y}px)` }}
                                        >
                                            <item.icon size={20} />
                                        </a>
                                    );
                                }
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Draggable>
    );
};

export default FloatingMenu;
