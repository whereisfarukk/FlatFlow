import React, { useState } from "react";
import { FileText, Search, Upload, FolderOpen, Clock, Download, Eye, Filter, Plus } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

const documents = [
    {
        id: "1",
        title: "Building Bylaws 2025",
        category: "Legal",
        uploadedBy: "Building Manager",
        uploadDate: "2025-01-15",
        size: "2.4 MB",
        type: "PDF",
        status: "public",
    },
    {
        id: "2",
        title: "Fire Safety Certificate",
        category: "Certificates",
        uploadedBy: "Safety Officer",
        uploadDate: "2025-02-01",
        size: "1.8 MB",
        type: "PDF",
        status: "public",
    },
    {
        id: "3",
        title: "Monthly Expense Report - February",
        category: "Financial",
        uploadedBy: "Treasurer",
        uploadDate: "2025-03-01",
        size: "856 KB",
        type: "XLSX",
        status: "restricted",
    },
    {
        id: "4",
        title: "Maintenance Contract 2025",
        category: "Contracts",
        uploadedBy: "Committee Secretary",
        uploadDate: "2025-01-10",
        size: "3.2 MB",
        type: "PDF",
        status: "private",
    },
    {
        id: "5",
        title: "Resident Directory",
        category: "General",
        uploadedBy: "Building Manager",
        uploadDate: "2025-02-15",
        size: "1.1 MB",
        type: "PDF",
        status: "restricted",
    },
];

const Documents = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");

    const categories = Array.from(new Set(documents.map((doc) => doc.category)));

    const filteredDocuments = documents.filter((doc) => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
        const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "public":
                return "success";
            case "private":
                return "danger";
            case "restricted":
                return "warning";
            default:
                return "default";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 -mx-8 px-8 py-8 mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-white">
                            <h1 className="text-3xl font-bold">Documents</h1>
                            <p className="mt-2 text-blue-100">Access and manage building documentation</p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex space-x-3">
                            <Button variant="secondary" leftIcon={<Upload size={16} />} className="bg-white text-blue-800 hover:bg-blue-50">
                                Upload Document
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                            <FileText size={24} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Documents</p>
                            <p className="text-xl font-semibold text-gray-900">{documents.length}</p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600">
                            <Eye size={24} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Public Documents</p>
                            <p className="text-xl font-semibold text-gray-900">{documents.filter((doc) => doc.status === "public").length}</p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                            <FolderOpen size={24} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Categories</p>
                            <p className="text-xl font-semibold text-gray-900">{categories.length}</p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                            <Clock size={24} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Recent Uploads</p>
                            <p className="text-xl font-semibold text-gray-900">
                                {
                                    documents.filter((doc) => {
                                        const thirtyDaysAgo = new Date();
                                        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                                        return new Date(doc.uploadDate) > thirtyDaysAgo;
                                    }).length
                                }
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </span>
                        <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search documents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="all">All Categories</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                            <option value="all">All Status</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="restricted">Restricted</option>
                        </select>

                        <Button variant="secondary" leftIcon={<Filter size={16} />}>
                            More Filters
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="group hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                                <FileText size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">{doc.title}</h3>
                                <div className="flex items-center mt-2 space-x-2">
                                    <Badge variant="secondary">{doc.category}</Badge>
                                    <Badge variant={getStatusColor(doc.status)}>{doc.status}</Badge>
                                </div>
                                <div className="mt-4 text-sm text-gray-500 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span>Size:</span>
                                        <span className="font-medium">{doc.size}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Type:</span>
                                        <span className="font-medium">{doc.type}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Uploaded:</span>
                                        <span className="font-medium">{new Date(doc.uploadDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                            <span className="text-sm text-gray-500">{doc.uploadedBy}</span>
                            <div className="flex space-x-2">
                                <Button variant="ghost" size="sm" leftIcon={<Eye size={16} />}>
                                    View
                                </Button>
                                <Button variant="ghost" size="sm" leftIcon={<Download size={16} />}>
                                    Download
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}

                {/* Add New Document Card */}
                <Card className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors duration-200 cursor-pointer group">
                    <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors duration-200">
                            <Plus size={24} className="text-blue-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Upload New Document</h3>
                        <p className="mt-1 text-sm text-gray-500">Click to upload or drag and drop</p>
                    </div>
                </Card>
            </div>

            {filteredDocuments.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No documents found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                </div>
            )}
        </div>
    );
};

export default Documents;
