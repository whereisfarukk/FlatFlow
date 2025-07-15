import React, { useState } from "react";
import { Calendar, Mail, Phone, Search, Users, Shield, Star, Award } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { committeeMembers } from "../data/mockData";

const Committee = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");

    const roles = Array.from(new Set(committeeMembers.map((member) => member.role)));

    const filteredMembers = committeeMembers.filter((member) => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === "all" || member.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    const roleResponsibilities = {
        President: ["Overall management of building affairs", "Conducting monthly committee meetings", "Final approval on major decisions", "Conflict resolution between residents"],
        Treasurer: ["Managing building funds and accounts", "Collecting monthly maintenance fees", "Preparing financial reports", "Budget planning and allocation"],
        Secretary: ["Maintaining meeting minutes and records", "Handling correspondence with residents", "Organizing committee meetings", "Managing building documentation"],
        "Maintenance Coordinator": ["Overseeing building maintenance", "Coordinating with service providers", "Regular building inspections", "Emergency repairs management"],
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case "President":
                return <Star className="w-5 h-5 text-yellow-500" />;
            case "Treasurer":
                return <Shield className="w-5 h-5 text-emerald-500" />;
            case "Secretary":
                return <Calendar className="w-5 h-5 text-blue-500" />;
            default:
                return <Award className="w-5 h-5 text-purple-500" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 -mx-8 px-8 py-8 mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-white">
                            <h1 className="text-3xl font-bold">Building Committee</h1>
                            <p className="mt-2 text-blue-100">Meet our dedicated team managing Khondokar Tower</p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <Button variant="secondary" leftIcon={<Users size={16} />} className="bg-white text-blue-800 hover:bg-blue-50">
                                Schedule Meeting
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(roleResponsibilities).map(([role]) => (
                    <Card key={role} className="bg-white border-l-4 border-l-blue-600">
                        <div className="flex items-center">
                            <div className="mr-4">{getRoleIcon(role)}</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">{role}</p>
                                <p className="text-lg font-semibold text-gray-900">{committeeMembers.filter((m) => m.role === role).length} Member</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Search and Filters */}
            <Card className="bg-white/50 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </span>
                        <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search committee members..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>

                    <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="all">All Roles</option>
                        {roles.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>
            </Card>

            {/* Committee Members Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredMembers.map((member) => (
                    <Card key={member.id} className="group bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="flex flex-col sm:flex-row items-start gap-6 p-6">
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
                                    {member.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                        <div className="flex items-center mt-1 space-x-2">
                                            {getRoleIcon(member.role)}
                                            <Badge variant="primary" className="text-sm">
                                                {member.role}
                                            </Badge>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-500">#{member.apartmentNumber}</span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <a href={`tel:${member.contactNumber}`} className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                        <Phone size={14} className="mr-2" />
                                        <span>{member.contactNumber}</span>
                                    </a>
                                    <a href={`mailto:${member.email}`} className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                        <Mail size={14} className="mr-2" />
                                        <span>{member.email}</span>
                                    </a>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Responsibilities</h4>
                                    <ul className="space-y-2">
                                        {roleResponsibilities[member.role]?.map((responsibility, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2"></span>
                                                <span className="text-sm text-gray-600">{responsibility}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {filteredMembers.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <Users size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No committee members found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                </div>
            )}
        </div>
    );
};

export default Committee;
