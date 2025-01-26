import React from 'react';

function Button({
    label,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    className = '',
    icon = null
}) {
    // Define button styles based on props
    const baseStyles = 'inline-flex items-center justify-center rounded-md focus:outline-none transition-colors';
    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        success: 'bg-green-500 text-white hover:bg-green-600',
        outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
    };
    const sizeStyles = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg',
    };

    // Combine styles
    const buttonClasses = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.medium} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonClasses}
        >
            {icon && <span className="mr-2">{icon}</span>} {/* Render icon if available */}
            {label}
        </button>
    );
}

export default Button;
