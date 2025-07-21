import React, { useState } from "react";
import { Bell, Calendar, ChevronDown, Filter, MessageSquare, Pin, Search, Plus, Send } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { announcements, currentUser } from "../data/mockData";

const Announcements = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterImportant, setFilterImportant] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("all");
    const [showNewAnnouncementModal, setShowNewAnnouncementModal] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: "",
        content: "",
        important: false,
        targetAudience: "",
    });
    const audience = [
        { id: "resident", title: "Resident" },
        { id: "admin", title: "Admin" },
        { id: "committee", title: "Committee" },
    ];

    const filteredAnnouncements = announcements
        .filter((announcement) => {
            const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesImportant = filterImportant ? announcement.important : true;
            const matchesMonth = selectedMonth === "all" ? true : new Date(announcement.date).toLocaleString("default", { month: "long" }).toLowerCase() === selectedMonth;

            return matchesSearch && matchesImportant && matchesMonth;
        })
        .sort((a, b) => {
            if (a.important && !b.important) return -1;
            if (!a.important && b.important) return 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

    const handleSubmitAnnouncement = async (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        const requestData = {
            ...newAnnouncement,
            date: new Date().toISOString().split("T")[0],
            postedBy: currentUser.name,
            id: Date.now().toString(),
        };
        try {
            const res = await fetch("http://localhost:3000/api/announcement", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...requestData }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to submit request");
            }
            console.log("✅ Submitted:", data);
            alert("announcement request submitted successfully!");
        } catch (err) {
            console.error("❌ Error submitting request:", err.message);
            alert("Failed to submit  request.");
        }
        // Reset form and close modal
        setNewAnnouncement({ title: "", content: "", important: false });
        setShowNewAnnouncementModal(false);

        // Show success message (you could add a toast notification here)
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
                    <p className="mt-1 text-sm text-gray-500">Stay updated with the latest building announcements</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    {currentUser.role === "admin" && (
                        <Button variant="primary" leftIcon={<MessageSquare size={16} />} onClick={() => setShowNewAnnouncementModal(true)}>
                            New Announcement
                        </Button>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <Card>
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-700">
                            <Bell size={20} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium text-gray-500">Total Announcements</p>
                            <p className="mt-1 text-xl font-semibold text-gray-900">{announcements.length}</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-red-100 text-red-700">
                            <Pin size={20} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium text-gray-500">Important Notices</p>
                            <p className="mt-1 text-xl font-semibold text-gray-900">{announcements.filter((a) => a.important).length}</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-700">
                            <Calendar size={20} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium text-gray-500">This Month</p>
                            <p className="mt-1 text-xl font-semibold text-gray-900">{announcements.filter((a) => new Date(a.date).getMonth() === new Date().getMonth()).length}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </span>
                        <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search announcements..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                            <option value="all">All Months</option>
                            {Array.from(new Set(announcements.map((a) => new Date(a.date).toLocaleString("default", { month: "long" }).toLowerCase()))).map((month) => (
                                <option key={month} value={month}>
                                    {month.charAt(0).toUpperCase() + month.slice(1)}
                                </option>
                            ))}
                        </select>

                        <Button variant={filterImportant ? "primary" : "secondary"} leftIcon={<Filter size={16} />} onClick={() => setFilterImportant(!filterImportant)}>
                            Important Only
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Announcements List */}
            <div className="space-y-4">
                {filteredAnnouncements.map((announcement) => (
                    <Card key={announcement.id} className="transform transition-all duration-200 hover:scale-[1.01]">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                                    {announcement.important && (
                                        <Badge variant="danger" className="animate-pulse">
                                            Important
                                        </Badge>
                                    )}
                                </div>
                                <p className="mt-2 text-gray-600">{announcement.content}</p>
                                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <MessageSquare size={14} />
                                        <span>Posted by {announcement.postedBy}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>
                                            {new Date(announcement.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">
                                <ChevronDown size={16} />
                            </Button>
                        </div>
                    </Card>
                ))}

                {filteredAnnouncements.length === 0 && (
                    <div className="text-center py-12">
                        <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No announcements found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>

            {/* New Announcement Modal */}
            <Modal isOpen={showNewAnnouncementModal} onClose={() => setShowNewAnnouncementModal(false)} title="Create New Announcement" size="lg">
                <form onSubmit={handleSubmitAnnouncement} className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-full mr-3">
                                <MessageSquare className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-blue-900">Publishing as Admin</h4>
                                <p className="text-xs text-blue-700">This announcement will be visible to all residents</p>
                            </div>
                        </div>
                    </div>
                    <fieldset>
                        <legend className="text-sm/6 font-semibold text-gray-900">Choose your target audience below</legend>
                        <p className="mt-1 text-sm/6 text-gray-600">Target Audience *</p>
                        <div className="mt-4 space-y-6 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                            {audience.map((notificationMethod) => (
                                <div key={notificationMethod.id} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={notificationMethod.id}
                                        name="notification-method"
                                        value={notificationMethod.id}
                                        checked={newAnnouncement.targetAudience === notificationMethod.id}
                                        onChange={(e) =>
                                            setNewAnnouncement((prev) => ({
                                                ...prev,
                                                targetAudience: e.target.value,
                                            }))
                                        }
                                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                    />

                                    <label htmlFor={notificationMethod.id} className="ml-3 block text-sm/6 font-medium text-gray-900">
                                        {notificationMethod.title}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Announcement Title *</label>
                        <input
                            type="text"
                            required
                            value={newAnnouncement.title}
                            onChange={(e) =>
                                setNewAnnouncement({
                                    ...newAnnouncement,
                                    title: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Enter a clear, descriptive title..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Announcement Content *</label>
                        <textarea
                            required
                            rows={6}
                            value={newAnnouncement.content}
                            onChange={(e) =>
                                setNewAnnouncement({
                                    ...newAnnouncement,
                                    content: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                            placeholder="Write your announcement details here. Be clear and informative..."
                        />
                    </div>

                    <div className="flex items-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <input
                            type="checkbox"
                            id="important"
                            checked={newAnnouncement.important}
                            onChange={(e) =>
                                setNewAnnouncement({
                                    ...newAnnouncement,
                                    important: e.target.checked,
                                })
                            }
                            className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
                        />
                        <label htmlFor="important" className="ml-3 flex items-center">
                            <Pin className="w-4 h-4 text-amber-600 mr-2" />
                            <span className="text-sm font-medium text-amber-800">Mark as Important</span>
                        </label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Button type="button" variant="secondary" onClick={() => setShowNewAnnouncementModal(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" leftIcon={<Send size={16} />}>
                            Publish Announcement
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Announcements;
