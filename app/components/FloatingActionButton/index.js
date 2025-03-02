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
    const radius = 80; // Distance of menu items from FAB

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
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <Draggable nodeRef={menuRef}>
            <div ref={menuRef} className="fixed top-1/2 left-4 transform -translate-y-1/2 cursor-pointer">
                <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Circular Menu Items (Clockwise animation) */}
                    {menuItems.map((item, index) => {
                        const angle = -90 + index * (180 / (menuItems.length - 1)); // Starts from top (-90°) to bottom (90°)
                        const radians = (angle * Math.PI) / 180;
                        const x = Math.cos(radians) * radius;
                        const y = Math.sin(radians) * radius;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 0, y: 0 }}
                                animate={isOpen ? { opacity: 1, x, y } : { opacity: 0, x: 0, y: 0 }}
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 15 }}
                                className="absolute flex items-center justify-center w-12 h-12 bg-white shadow-md rounded-full cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                    item.onClick();
                                    setIsOpen(false); // Close menu when an item is clicked
                                }}
                            >
                                {item.icon}
                            </motion.div>
                        );
                    })}

                    {/* Floating Action Button */}
                    <button
                        ref={buttonRef}
                        onClick={() => setIsOpen(!isOpen)}
                        className="absolute w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition duration-300"
                    >
                        <PlusIcon className={`w-8 h-8 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                    </button>
                </div>
            </div>
        </Draggable>
    );
};

export default DraggableFloatingButton;
