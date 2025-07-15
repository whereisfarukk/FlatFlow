import React from "react";

const Badge = ({ variant = "default", children, className = "" }) => {
    const variantStyles = {
        default: "bg-gray-100 text-gray-800",
        primary: "bg-blue-100 text-blue-800",
        secondary: "bg-gray-200 text-gray-800",
        success: "bg-green-100 text-green-800",
        danger: "bg-red-100 text-red-800",
        warning: "bg-amber-100 text-amber-800",
        info: "bg-teal-100 text-teal-800",
    };

    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}>{children}</span>;
};

export default Badge;
