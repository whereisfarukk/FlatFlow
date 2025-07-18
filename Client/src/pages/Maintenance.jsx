import React, { useState } from "react";
import { AlertTriangle, Calendar, CheckCircle, Clock, Filter, Plus, Search, PenTool as Tool, User, Wrench, Eye, Edit, Trash2 } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { maintenanceRequests, currentUser } from "../data/mockData";

const Maintenance = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedPriority, setSelectedPriority] = useState("all");
    const [showNewRequestModal, setShowNewRequestModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [newRequest, setNewRequest] = useState({
        title: "",
        description: "",
        priority: "medium",
        location: "",
        category: "plumbing",
    });

    const categories = ["plumbing", "electrical", "hvac", "structural", "appliance", "security", "cleaning", "other"];

    const filteredRequests = maintenanceRequests.filter((request) => {
        const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) || request.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === "all" || request.status === selectedStatus;
        const matchesPriority = selectedPriority === "all" || request.priority === selectedPriority;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const handleSubmitRequest = (e) => {
        e.preventDefault();
        console.log("New maintenance request:", {
            ...newRequest,
            id: Date.now().toString(),
            status: "pending",
            submittedBy: currentUser.name,
            apartmentNumber: currentUser.apartmentNumber,
            dateSubmitted: new Date().toISOString().split("T")[0],
        });

        setNewRequest({
            title: "",
            description: "",
            priority: "medium",
            location: "",
            category: "plumbing",
        });
        setShowNewRequestModal(false);
        alert("Maintenance request submitted successfully!");
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "warning";
            case "in-progress":
                return "info";
            case "resolved":
                return "success";
            default:
                return "secondary";
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "danger";
            case "medium":
                return "warning";
            case "low":
                return "info";
            default:
                return "secondary";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <Clock size={16} />;
            case "in-progress":
                return <Tool size={16} />;
            case "resolved":
                return <CheckCircle size={16} />;
            default:
                return <AlertTriangle size={16} />;
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case "plumbing":
                return "🔧";
            case "electrical":
                return "⚡";
            case "hvac":
                return "❄️";
            case "structural":
                return "🏗️";
            case "appliance":
                return "📱";
            case "security":
                return "🔒";
            case "cleaning":
                return "🧹";
            default:
                return "🔨";
        }
    };

    const stats = {
        total: maintenanceRequests.length,
        pending: maintenanceRequests.filter((r) => r.status === "pending").length,
        inProgress: maintenanceRequests.filter((r) => r.status === "in-progress").length,
        resolved: maintenanceRequests.filter((r) => r.status === "resolved").length,
        highPriority: maintenanceRequests.filter((r) => r.priority === "high").length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 -mx-8 px-8 py-8 mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-white">
                            <h1 className="text-3xl font-bold">Maintenance Requests</h1>
                            <p className="mt-2 text-orange-100">Track and manage building maintenance issues</p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <Button variant="secondary" leftIcon={<Plus size={16} />} className="bg-white text-orange-800 hover:bg-orange-50" onClick={() => setShowNewRequestModal(true)}>
                                New Request
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-600 bg-opacity-30">
                            <Wrench size={24} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium text-blue-100">Total Requests</p>
                            <p className="text-2xl font-bold">{stats.total}</p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500 to-amber-700 text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-amber-600 bg-opacity-30">
                            <Clock size={24} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium text-amber-100">Pending</p>
                            <p className="text-2xl font-bold">{stats.pending}</p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-600 bg-opacity-30">
                            <Tool size={24} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium text-blue-100">In Progress</p>
                            <p className="text-2xl font-bold">{stats.inProgress}</p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-600 bg-opacity-30">
                            <CheckCircle size={24} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium text-green-100">Resolved</p>
                            <p className="text-2xl font-bold">{stats.resolved}</p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-red-500 to-red-700 text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-red-600 bg-opacity-30">
                            <AlertTriangle size={24} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium text-red-100">High Priority</p>
                            <p className="text-2xl font-bold">{stats.highPriority}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </span>
                        <input
                            type="text"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5"
                            placeholder="Search maintenance requests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>

                        <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5" value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)}>
                            <option value="all">All Priority</option>
                            <option value="high">High Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="low">Low Priority</option>
                        </select>

                        <Button variant="secondary" leftIcon={<Filter size={16} />}>
                            More Filters
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Maintenance Requests List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRequests.map((request) => (
                    <Card
                        key={request.id}
                        className="group hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => {
                            setSelectedRequest(request);
                            setShowDetailsModal(true);
                        }}
                    >
                        <div className="space-y-4">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="text-2xl">{getCategoryIcon(request.category || "other")}</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{request.title}</h3>
                                        <p className="text-sm text-gray-500">#{request.apartmentNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge variant={getPriorityColor(request.priority)}>{request.priority}</Badge>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-600 line-clamp-2">{request.description}</p>

                            {/* Status and Date */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Badge variant={getStatusColor(request.status)} className="flex items-center space-x-1">
                                        {getStatusIcon(request.status)}
                                        <span className="capitalize">{request.status.replace("-", " ")}</span>
                                    </Badge>
                                </div>
                                <div className="text-xs text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <Calendar size={12} />
                                        <span>{new Date(request.dateSubmitted).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                <div className="flex items-center space-x-1 text-xs text-gray-500">
                                    <User size={12} />
                                    <span>{request.submittedBy}</span>
                                </div>
                                {request.assignedTo && <div className="text-xs text-gray-500">Assigned to: {request.assignedTo}</div>}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {filteredRequests.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <Wrench size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No maintenance requests found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                </div>
            )}

            {/* New Request Modal */}
            <Modal isOpen={showNewRequestModal} onClose={() => setShowNewRequestModal(false)} title="Submit New Maintenance Request" size="lg">
                <form onSubmit={handleSubmitRequest} className="space-y-6">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Title *</label>
                            <input
                                type="text"
                                required
                                value={newRequest.title}
                                onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Brief description of the issue..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                            <select value={newRequest.category} onChange={(e) => setNewRequest({ ...newRequest, category: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Location/Area</label>
                            <input
                                type="text"
                                value={newRequest.location}
                                onChange={(e) => setNewRequest({ ...newRequest, location: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                placeholder="e.g., Kitchen, Bathroom, Living Room..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Priority Level</label>
                            <select value={newRequest.priority} onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                <option value="low">Low - Can wait a few days</option>
                                <option value="medium">Medium - Should be addressed soon</option>
                                <option value="high">High - Urgent attention needed</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description *</label>
                        <textarea
                            required
                            rows={4}
                            value={newRequest.description}
                            onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                            placeholder="Please provide detailed information about the issue, when it started, and any other relevant details..."
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Button type="button" variant="secondary" onClick={() => setShowNewRequestModal(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" leftIcon={<Plus size={16} />}>
                            Submit Request
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Request Details Modal */}
            <Modal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} title="Maintenance Request Details" size="lg">
                {selectedRequest && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="text-3xl">{getCategoryIcon(selectedRequest.category || "other")}</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{selectedRequest.title}</h3>
                                        <p className="text-gray-600">Apartment #{selectedRequest.apartmentNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge variant={getPriorityColor(selectedRequest.priority)}>{selectedRequest.priority} Priority</Badge>
                                    <Badge variant={getStatusColor(selectedRequest.status)} className="flex items-center space-x-1">
                                        {getStatusIcon(selectedRequest.status)}
                                        <span className="capitalize">{selectedRequest.status.replace("-", " ")}</span>
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Request Details</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Submitted by:</span>
                                        <span className="font-medium">{selectedRequest.submittedBy}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Date submitted:</span>
                                        <span className="font-medium">{new Date(selectedRequest.dateSubmitted).toLocaleDateString()}</span>
                                    </div>
                                    {selectedRequest.assignedTo && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Assigned to:</span>
                                            <span className="font-medium">{selectedRequest.assignedTo}</span>
                                        </div>
                                    )}
                                    {selectedRequest.dateResolved && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Date resolved:</span>
                                            <span className="font-medium">{new Date(selectedRequest.dateResolved).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Status Timeline</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>Request submitted</span>
                                    </div>
                                    {selectedRequest.status !== "pending" && (
                                        <div className="flex items-center space-x-2 text-sm">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                            <span>In progress</span>
                                        </div>
                                    )}
                                    {selectedRequest.status === "resolved" && (
                                        <div className="flex items-center space-x-2 text-sm">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span>Resolved</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRequest.description}</p>
                        </div>

                        {selectedRequest.comments && selectedRequest.comments.length > 0 && (
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Comments</h4>
                                <div className="space-y-2">
                                    {selectedRequest.comments.map((comment, index) => (
                                        <div key={index} className="bg-blue-50 p-3 rounded-lg">
                                            <p className="text-sm text-gray-700">{comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentUser.role === "admin" && (
                            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                <Button variant="secondary" leftIcon={<Edit size={16} />}>
                                    Update Status
                                </Button>
                                <Button variant="danger" leftIcon={<Trash2 size={16} />}>
                                    Delete Request
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Maintenance;
