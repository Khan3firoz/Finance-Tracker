import React from 'react';

function TextBox({ label, type, register, errors, name, placeholder }) {
    return (
        <div className="space-y-1">
            {/* Label */}
            <label htmlFor={name} className="block text-gray-700">
                {label}
            </label>

            {/* Input Field */}
            <input
                id={name}
                type={type}
                {...register(name)} // Registering input with react-hook-form
                placeholder={placeholder}
                className="w-full px-4 p-2 border-2 border-gray-700 dark:border-gray-600 rounded-full focus:outline-none  bg-transparent dark:bg-gray-800 text-gray-700"
            />

            {/* Error Message */}
            {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name].message}</p>
            )}
        </div>
    );
}

export default TextBox;
