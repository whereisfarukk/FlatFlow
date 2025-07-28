import React from "react";

const Card = ({ title, children, className = "", footer }) => {
    return (
        <div className={`bg-white rounded-lg border overflow-hidden transition-all duration-200  ${className}`}>
            {title && (
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                </div>
            )}
            <div className="p-6">{children}</div>
            {footer && <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">{footer}</div>}
        </div>
    );
};

export default Card;
