import React from "react";

const Button = ({ children, variant = "primary", size = "md", isLoading = false, leftIcon, rightIcon, className = "", disabled, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyles = {
        primary: "bg-blue-800 hover:bg-blue-900 text-white focus:ring-blue-600",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400",
        success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
        danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
        warning: "bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-400",
        info: "bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-300",
    };

    const sizeStyles = {
        sm: "text-xs px-3 py-2",
        md: "text-sm px-4 py-2",
        lg: "text-base px-6 py-3",
    };

    const disabledStyles = disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";

    return (
        <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`} disabled={disabled || isLoading} {...props}>
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </button>
    );
};

export default Button;
