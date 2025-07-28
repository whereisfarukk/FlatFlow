import React, { useState, useEffect } from "react";
import { FileText, Search, Upload, FolderOpen, Clock, Download, Eye, Filter, Plus, Wrench } from "lucide-react";
import { AlertTriangle, Calendar, CheckCircle, PenTool as Tool, User, Edit, Trash2 } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { Listbox, ListboxOption } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { Fragment } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

import { maintenanceRequests, currentUser } from "../data/mockData";
import { Loader } from "../components/ui/Loader";
// const documents = [
//     {
//         id: "1",
//         title: "Building Bylaws 2025",
//         category: "Legal",
//         uploadedBy: "Building Manager",
//         uploadDate: "2025-01-15",
//         size: "2.4 MB",
//         type: "PDF",
//         status: "public",
//     },
//     {
//         id: "2",
//         title: "Fire Safety Certificate",
//         category: "Certificates",
//         uploadedBy: "Safety Officer",
//         uploadDate: "2025-02-01",
//         size: "1.8 MB",
//         type: "PDF",
//         status: "public",
//     },
//     {
//         id: "3",
//         title: "Monthly Expense Report - February",
//         category: "Financial",
//         uploadedBy: "Treasurer",
//         uploadDate: "2025-03-01",
//         size: "856 KB",
//         type: "XLSX",
//         status: "restricted",
//     },
//     {
//         id: "4",
//         title: "Maintenance Contract 2025",
//         category: "Contracts",
//         uploadedBy: "Committee Secretary",
//         uploadDate: "2025-01-10",
//         size: "3.2 MB",
//         type: "PDF",
//         status: "private",
//     },
//     {
//         id: "5",
//         title: "Resident Directory",
//         category: "General",
//         uploadedBy: "Building Manager",
//         uploadDate: "2025-02-15",
//         size: "1.1 MB",
//         type: "PDF",
//         status: "restricted",
//     },
// ];
const categories = ["plumbing", "electrical", "hvac", "structural", "appliance", "security", "cleaning", "other"];
const Documents = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [showNewRequestModal, setShowNewRequestModal] = useState(false);
    const [newRequest, setNewRequest] = useState({
        title: "",
        description: "",
        category: "legal",
        file: null,
    });
    const [documents, setDocuments] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const categories = ["legal", "financial", "maintenance", "insurance", "certificates", "meeting_minutes"];

    const [file, setFile] = useState(null);
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/document", {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Failed to fetch documents");

                const data = await res.json();
                setDocuments(data.data); // assuming your backend returns { data: [...] }
            } catch (err) {
                console.error("Error fetching documents:", err);
            }
        };

        fetchDocuments();
    }, []);
    console.log(Documents);

    const handleSubmitRequest = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const { title, description, category, file } = newRequest;

        if (!file) {
            alert("Please select a file.");
            return;
        }

        if (!title || !description || !category) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);

        console.log(formData);
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/document", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            alert("Uploaded: " + data.message);

            // Reset form
            setNewRequest({ title: "", description: "", category: "legal", file: null });
            setShowNewRequestModal(false);
        } catch (err) {
            console.error(err);
            alert("Upload failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const filteredDocuments = documents.filter((doc) => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
        const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "residents":
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
                            {/* <input type="file" accept="application/pdf" onChange={handleChange} /> */}
                            <div className="mt-4 sm:mt-0 flex space-x-3">
                                <label className="relative inline-block ">
                                    {/* <input type="file" accept="application/pdf" onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /> */}
                                    <Button onClick={() => setShowNewRequestModal(true)} variant="secondary" leftIcon={<Upload size={16} />} className="bg-white text-blue-800 hover:bg-blue-50">
                                        Upload Document
                                    </Button>
                                </label>
                            </div>
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
                            <p className="text-xl font-semibold text-gray-900">{documents.filter((doc) => doc.accessLevel === "residents").length}</p>
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
                                        return new Date(doc.createdAt) > thirtyDaysAgo;
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
                    <Card key={doc._id} className="group hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                                <FileText size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">{doc.title}</h3>
                                <div className="flex items-center mt-2 space-x-2">
                                    <Badge variant="secondary">{doc.category}</Badge>
                                    <Badge variant={getStatusColor(doc.accessLevel)}>{doc.accessLevel}</Badge>
                                </div>
                                <div className="mt-4 text-sm text-gray-500 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span>Size:</span>
                                        <span className="font-medium">{(doc.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Type:</span>
                                        <span className="font-medium">Pdf</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Uploaded:</span>
                                        <span className="font-medium">{new Date(doc.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                            <span className="text-sm text-gray-500">{doc?.uploadedBy?.role}</span>
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
                        <div onClick={() => setShowNewRequestModal(true)} role="button" tabIndex={0} className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors duration-200">
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
            <Modal isOpen={showNewRequestModal} onClose={() => setShowNewRequestModal(false)} title="Upload New Document" size="lg">
                {isLoading && (
                    <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-sm flex items-center justify-center">
                        <Loader />
                    </div>
                )}

                <form onSubmit={handleSubmitRequest} className="space-y-6">
                    <div className="grid grid-cols-1  gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2"> Title *</label>
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
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                            <Listbox value={newRequest.category} onChange={(value) => setNewRequest({ ...newRequest, category: value })}>
                                <div className="relative">
                                    <Listbox.Button className="relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-3 px-4 text-left  focus:outline-none focus:ring-2  sm:text-sm">{newRequest.category.charAt(0).toUpperCase() + newRequest.category.slice(1)}</Listbox.Button>
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm z-10">
                                        {categories.map((category) => (
                                            <ListboxOption key={category} value={category} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-orange-100 text-orange-900" : "text-gray-900"}`}>
                                                {({ selected }) => (
                                                    <>
                                                        <span className="absolute left-2 top-2"></span>
                                                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                                                    </>
                                                )}
                                            </ListboxOption>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                        </div>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <CloudArrowUpIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                                <div className="mt-4 flex text-sm/6 text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600   hover:text-indigo-500">
                                        <span>Click to upload</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setNewRequest((prev) => ({ ...prev, file }));
                                                }
                                            }}
                                            accept=".pdf,.doc,.docx,.xlsx,.xls"
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs/5 text-gray-600">PDF, DOC, DOCX, XLS, XLSX up to 10MB</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Button type="button" variant="secondary" onClick={() => setShowNewRequestModal(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" leftIcon={<Plus size={16} disabled={!newRequest.file || isLoading} />}>
                            Submit Request
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Documents;
