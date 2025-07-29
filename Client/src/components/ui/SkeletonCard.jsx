import React from "react";
import Card from "./Card";

export const SkeletonCard = () => {
    return (
        <Card className="animate-pulse">
            <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-blue-50">
                    <div className="bg-blue-200 h-6 w-6 rounded"></div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="flex space-x-2 mb-4">
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="flex space-x-2">
                    <div className="h-8 w-16 bg-gray-200 rounded"></div>
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        </Card>
    );
};
