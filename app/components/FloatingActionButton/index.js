"use client";

import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useExpenceContext } from "@/app/Context/ExpenceContext";
import { useAppContext } from "@/app/Context/AppContext";
import { Bank, SquaresFour, Wallet } from "@phosphor-icons/react";

const DraggableFloatingButton = () => {
    const { handleOpen } = useExpenceContext();
    const { handleAddCategory, handleAddTransaction } = useAppContext();

    const menuItems = [
        { icon: <Bank className="w-6 h-6 text-blue-500" />, label: "Edit", onClick: handleOpen },
        { icon: <Wallet className="w-6 h-6 text-red-500" />, label: "Delete", onClick: handleAddTransaction },
        { icon: <SquaresFour className="w-6 h-6 text-gray-500" />, label: "Create Category", onClick: handleAddCategory },
        { icon: <PencilIcon className="w-6 h-6 text-green-500" />, label: "Share", onClick: () => alert("Share Clicked") }
    ];

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const containerRef = useRef(null);
    const radius = window.innerWidth < 640 ? 60 : 80;

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isOpen]);

    const handleItemClick = (onClick) => {
        onClick();
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none">
            <Draggable
                nodeRef={menuRef}
                bounds="parent"
                defaultPosition={{ x: 0, y: 0 }}
                onStart={(e) => {
                    // Prevent menu from opening when dragging
                    if (e.target === buttonRef.current) {
                        e.stopPropagation();
                    }
                }}
            >
                <div
                    ref={menuRef}
                    className="fixed bottom-4 right-4 sm:top-1/2 sm:left-4 sm:transform sm:-translate-y-1/2 cursor-pointer z-50 pointer-events-auto"
                >
                    <div className="relative w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center">
                        {/* Circular Menu Items */}
                        {menuItems.map((item, index) => {
                            const angle = -90 + index * (180 / (menuItems.length - 1));
                            const radians = (angle * Math.PI) / 180;
                            const x = Math.cos(radians) * radius;
                            const y = Math.sin(radians) * radius;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 0, y: 0 }}
                                    animate={isOpen ? { opacity: 1, x, y } : { opacity: 0, x: 0, y: 0 }}
                                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 15 }}
                                    className="absolute flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-md rounded-full cursor-pointer hover:bg-gray-100 active:bg-gray-200"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleItemClick(item.onClick);
                                    }}
                                >
                                    {item.icon}
                                </motion.div>
                            );
                        })}

                        {/* Floating Action Button */}
                        <button
                            ref={buttonRef}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(!isOpen);
                            }}
                            className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 active:bg-blue-800 transition duration-300"
                        >
                            <PlusIcon className={`w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                        </button>
                    </div>
                </div>
            </Draggable>
        </div>
    );
};

export default DraggableFloatingButton;
