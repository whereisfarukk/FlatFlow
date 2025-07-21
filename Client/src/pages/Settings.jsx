import React, { useState } from "react";
import { Bell, Key, Lock, Mail, Shield, User } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { currentUser } from "../data/mockData";

const Settings = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState(currentUser.email || "");
    const [notifications, setNotifications] = useState({
        announcements: true,
        maintenance: true,
        bills: true,
        security: true,
    });

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            try {
                const res = await fetch("http://localhost:3000/auth/change-password", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword, confirm_new_password: confirmPassword }),
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || "Failed to submit request");
                }
                console.log("✅ Submitted:", data);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                alert("password change successfully!");
            } catch (err) {
                console.error("❌ Error submitting request:", err.message);
                alert(err.message || "Failed to submit  request.");
            }
        } else {
            alert("New password and confirm password do not match");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    const handleEmailChange = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/auth/change-email", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to submit request");
            }
            console.log("✅ Submitted:", data);
            setEmail("");
            alert("Email Updated successfully!");
        } catch (err) {
            console.error("❌ Error submitting request:", err.message);
            alert(err.message || "Failed to submit  request.");
        }
    };

    const handleNotificationChange = (key) => {
        setNotifications((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 -mx-8 px-8 py-8 mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-white">
                            <h1 className="text-3xl font-bold">Account Settings</h1>
                            <p className="mt-2 text-blue-100">Manage your account preferences and security settings</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Information */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl font-bold mb-4">{currentUser.name.charAt(0)}</div>
                            <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
                            <p className="text-gray-500 mt-1">Apartment #{currentUser.apartmentNumber}</p>
                            <Badge variant="primary" className="mt-2">
                                Resident
                            </Badge>

                            <div className="w-full mt-6 pt-6 border-t border-gray-200">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Account Status</span>
                                        <Badge variant="success">Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Member Since</span>
                                        <span className="font-medium">January 2025</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Last Login</span>
                                        <span className="font-medium">2 hours ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    {/* Security Settings */}
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <Shield className="w-5 h-5 text-blue-600 mr-2" />
                                <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
                            </div>
                        </div>

                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                <div className="mt-1 relative">
                                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                                    <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                <div className="mt-1 relative">
                                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                                    <Key className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                <div className="mt-1 relative">
                                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                                    <Key className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" variant="primary">
                                    Update Password
                                </Button>
                            </div>
                        </form>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <Mail className="w-5 h-5 text-blue-600 mr-2" />
                                <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
                            </div>
                        </div>

                        <form onSubmit={handleEmailChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <div className="mt-1 relative">
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                                    <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" variant="primary">
                                    Update Email
                                </Button>
                            </div>
                        </form>
                    </Card>

                    {/* Notification Preferences */}
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <Bell className="w-5 h-5 text-blue-600 mr-2" />
                                <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(notifications).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 capitalize">{key}</h3>
                                        <p className="text-sm text-gray-500">Receive notifications about {key}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={value} onChange={() => handleNotificationChange(key)} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Account Information */}
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <User className="w-5 h-5 text-blue-600 mr-2" />
                                <h2 className="text-xl font-bold text-gray-900">Account Information</h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <input type="text" value={currentUser.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 cursor-not-allowed" disabled />
                                <p className="mt-1 text-sm text-gray-500">Username cannot be changed</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Apartment Number</label>
                                <input type="text" value={currentUser.apartmentNumber} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 cursor-not-allowed" disabled />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Settings;
