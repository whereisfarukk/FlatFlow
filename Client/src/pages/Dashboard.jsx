import React, { useState } from "react";
import { AlertTriangle, Check, Clock, DollarSign, HelpCircle, MessageCircle, Plus, Wrench } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { announcements, buildingFund, maintenanceRequests, currentUser } from "../data/mockData";

const Dashboard = () => {
    const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
    const [newMaintenanceRequest, setNewMaintenanceRequest] = useState({
        title: "",
        description: "",
        priority: "medium",
        location: "",
    });

    const latestAnnouncements = announcements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

    const pendingMaintenance = maintenanceRequests.filter((request) => request.status !== "resolved");

    const handleSubmitMaintenanceRequest = (e) => {
        e.preventDefault();

        // Here you would typically send the data to your backend
        console.log("New maintenance request:", {
            ...newMaintenanceRequest,
            id: Date.now().toString(),
            status: "pending",
            submittedBy: currentUser.name,
            apartmentNumber: currentUser.apartmentNumber,
            dateSubmitted: new Date().toISOString().split("T")[0],
        });

        // Reset form and close modal
        setNewMaintenanceRequest({
            title: "",
            description: "",
            priority: "medium",
            location: "",
        });
        setShowMaintenanceModal(false);

        alert("Maintenance request submitted successfully!");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <div className="mt-4 sm:mt-0">
                    <Button leftIcon={<HelpCircle size={16} />}>Need Help?</Button>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-blue-700 to-blue-900 text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-800 bg-opacity-30">
                            <DollarSign size={24} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium">Building Fund</p>
                            <p className="text-2xl font-bold">৳{buildingFund.totalAmount.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="mt-4 text-sm">
                        <span className="text-blue-100">Last updated: {new Date(buildingFund.lastUpdated).toLocaleDateString()}</span>
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-teal-600 to-teal-800 text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-teal-700 bg-opacity-30">
                            <MessageCircle size={24} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium">Announcements</p>
                            <p className="text-2xl font-bold">{announcements.length}</p>
                        </div>
                    </div>
                    <div className="mt-4 text-sm">
                        <span className="text-teal-100">{announcements.filter((a) => a.important).length} important notices</span>
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500 to-amber-700 text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-amber-600 bg-opacity-30">
                            <AlertTriangle size={24} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium">Maintenance Issues</p>
                            <p className="text-2xl font-bold">{pendingMaintenance.length}</p>
                        </div>
                    </div>
                    <div className="mt-4 text-sm">
                        <span className="text-amber-100">{maintenanceRequests.filter((r) => r.priority === "high").length} high priority</span>
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-green-600 to-green-800 text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-700 bg-opacity-30">
                            <Check size={24} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium">Resolved Issues</p>
                            <p className="text-2xl font-bold">{maintenanceRequests.filter((r) => r.status === "resolved").length}</p>
                        </div>
                    </div>
                    <div className="mt-4 text-sm">
                        <span className="text-green-100">This month</span>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Announcements */}
                <div className="lg:col-span-2">
                    <Card title="Recent Announcements">
                        <div className="space-y-4">
                            {latestAnnouncements.map((announcement) => (
                                <div key={announcement.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                                        {announcement.important && <Badge variant="danger">Important</Badge>}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{announcement.content}</p>
                                    <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                                        <span>Posted by: {announcement.postedBy}</span>
                                        <span>{new Date(announcement.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="text-center pt-2">
                                <Button variant="ghost" size="sm">
                                    View All Announcements
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Maintenance Requests */}
                <div>
                    <Card title="Maintenance Requests">
                        <div className="space-y-3">
                            {pendingMaintenance.slice(0, 3).map((request) => (
                                <div key={request.id} className="flex items-start p-3 border border-gray-200 rounded-lg">
                                    <div className={`rounded-full p-2 mr-3 ${request.priority === "high" ? "bg-red-100 text-red-600" : request.priority === "medium" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"}`}>
                                        {request.status === "pending" ? <Clock size={16} /> : <AlertTriangle size={16} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{request.title}</p>
                                        <div className="flex items-center mt-1">
                                            <Badge variant={request.status === "pending" ? "warning" : request.status === "in-progress" ? "info" : "success"}>{request.status}</Badge>
                                            <span className="ml-2 text-xs text-gray-500">{new Date(request.dateSubmitted).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="pt-2">
                                <Button variant="primary" size="sm" className="w-full" onClick={() => setShowMaintenanceModal(true)}>
                                    Submit New Request
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Maintenance Request Modal */}
            <Modal isOpen={showMaintenanceModal} onClose={() => setShowMaintenanceModal(false)} title="Submit Maintenance Request" size="lg">
                <form onSubmit={handleSubmitMaintenanceRequest} className="space-y-6">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-full mr-3">
                                <Wrench className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-orange-900">Maintenance Request</h4>
                                <p className="text-xs text-orange-700">
                                    Apartment #{currentUser.apartmentNumber} - {currentUser.name}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Title *</label>
                        <input
                            type="text"
                            required
                            value={newMaintenanceRequest.title}
                            onChange={(e) => setNewMaintenanceRequest({ ...newMaintenanceRequest, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Brief description of the issue..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Location/Area</label>
                        <input
                            type="text"
                            value={newMaintenanceRequest.location}
                            onChange={(e) => setNewMaintenanceRequest({ ...newMaintenanceRequest, location: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Kitchen, Bathroom, Living Room, Common Area..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Priority Level</label>
                        <select value={newMaintenanceRequest.priority} onChange={(e) => setNewMaintenanceRequest({ ...newMaintenanceRequest, priority: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="low">Low - Can wait a few days</option>
                            <option value="medium">Medium - Should be addressed soon</option>
                            <option value="high">High - Urgent attention needed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description *</label>
                        <textarea
                            required
                            rows={4}
                            value={newMaintenanceRequest.description}
                            onChange={(e) => setNewMaintenanceRequest({ ...newMaintenanceRequest, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            placeholder="Please provide detailed information about the issue, when it started, and any other relevant details..."
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Button type="button" variant="secondary" onClick={() => setShowMaintenanceModal(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" leftIcon={<Plus size={16} />}>
                            Submit Request
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Dashboard;
