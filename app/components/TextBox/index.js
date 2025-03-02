'use client'
import React from 'react';

function TextBox({ label, type, register, errors, name, placeholder }) {
    return (
        <div className="space-y-1">
            {/* Label */}
            {/* <label htmlFor={name} className="block text-gray-700">
                {label}
            </label> */}

            {/* Input Field */}
            <input
                id={name}
                type={type}
                {...register(name)} // Registering input with react-hook-form
                placeholder={placeholder}
                className="w-full px-4 p-1.5 border-2 border-gray-300 dark:border-gray-300 rounded-lg
                    bg-transparent focus:bg-transparent autofill:!bg-transparent shadow-none
                    text-gray-700 appearance-none"
                style={{
                    WebkitBoxShadow: "0 0 0px 1000px transparent inset", // Fixes autofill background in Safari
                    WebkitTextFillColor: "currentColor", // Ensures text remains visible
                }}
                // className="w-full px-4 p-1.5 border-2 border-gray-300 dark:border-gray-300 rounded-lg focus:outline-none  bg-transparent  text-gray-700"
            />

            {/* Error Message */}
            {errors && (
                <p className="text-red-500 text-sm">{errors[name]?.message}</p>
            )}
        </div>
    );
}

export default TextBox;
