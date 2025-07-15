import React, { useState } from "react";
import { Bell, ChevronDown, Menu, User } from "lucide-react";
import { Link } from "react-router-dom";
import { currentUser } from "../../data/mockData";

const Header = ({ toggleSidebar }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="bg-white shadow-sm z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <button className="p-2 rounded-md text-gray-600 lg:hidden" onClick={toggleSidebar}>
                            <Menu size={24} />
                        </button>
                        <Link to="/" className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
                            <span className="text-xl font-bold text-blue-800">Khondokar Tower</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100" onClick={() => setShowNotifications(!showNotifications)}>
                                <Bell size={20} />
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                            </button>
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <h3 className="text-sm font-semibold">Notifications</h3>
                                    </div>
                                    <div className="max-h-60 overflow-y-auto">
                                        <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                                            <p className="text-sm font-medium">Water Shutdown Notice</p>
                                            <p className="text-xs text-gray-500">There will be a water shutdown for maintenance on Friday...</p>
                                            <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                                        </div>
                                        <div className="px-4 py-3 hover:bg-gray-50">
                                            <p className="text-sm font-medium">Your maintenance request has been updated</p>
                                            <p className="text-xs text-gray-500">Leaking faucet status changed to "in progress"</p>
                                            <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 border-t border-gray-200">
                                        <Link to="/notifications" className="text-xs text-blue-600 hover:text-blue-800">
                                            View all notifications
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900" onClick={() => setShowUserMenu(!showUserMenu)}>
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">{currentUser.name.charAt(0)}</div>
                                <span className="hidden md:block">{currentUser.name}</span>
                                <ChevronDown size={16} />
                            </button>
                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Your Profile
                                    </Link>
                                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Settings
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
