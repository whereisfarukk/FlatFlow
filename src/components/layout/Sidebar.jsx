import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Building2, FileText, Home, MessageSquare, Settings, PenTool as Tool, Users, X, Zap } from "lucide-react";

const Sidebar = ({ isOpen, closeSidebar }) => {
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", icon: <Home size={20} />, path: "/" },
        { name: "Announcements", icon: <MessageSquare size={20} />, path: "/announcements" },
        { name: "Financial Reports", icon: <BarChart3 size={20} />, path: "/finances" },
        { name: "Utility Bills", icon: <Zap size={20} />, path: "/bills" },
        { name: "Maintenance", icon: <Tool size={20} />, path: "/maintenance" },
        { name: "Committee", icon: <Users size={20} />, path: "/committee" },
        { name: "Building Info", icon: <Building2 size={20} />, path: "/building" },
        { name: "Documents", icon: <FileText size={20} />, path: "/documents" },
        { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            {/* Mobile sidebar backdrop */}
            {isOpen && <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden" onClick={closeSidebar}></div>}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-blue-900 text-white transform transition-transform duration-300 ease-in-out z-30 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between h-16 px-4 border-b border-blue-800">
                        <Link to="/" className="flex items-center space-x-2">
                            <Building2 size={24} />
                            <span className="text-lg font-bold">Khondokar Tower</span>
                        </Link>
                        <button className="lg:hidden p-2 rounded-md text-blue-200 hover:text-white" onClick={closeSidebar}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4">
                        <nav className="px-2 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${isActive(item.path) ? "bg-blue-800 text-white" : "text-blue-100 hover:bg-blue-800 hover:text-white"}`}
                                    onClick={() => window.innerWidth < 1024 && closeSidebar()}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="p-4 border-t border-blue-800">
                        <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-800 flex items-center justify-center text-white">
                                <span className="text-sm font-medium">301</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">Apartment #301</p>
                                <p className="text-xs text-blue-200">Resident</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
