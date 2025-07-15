import React from "react";
import { Building2, Users, Calculator as Elevator, Home, Phone, Shield, Calendar, Clock, MapPin, Warehouse } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const Building = () => {
    const buildingFeatures = [
        { icon: <Building2 className="w-6 h-6" />, title: "Stories", value: "12 Floors" },
        { icon: <Home className="w-6 h-6" />, title: "Units", value: "30 Apartments" },
        { icon: <Elevator className="w-6 h-6" />, title: "Elevators", value: "2 Units" },
        { icon: <Users className="w-6 h-6" />, title: "Residents", value: "120+ People" },
    ];

    const amenities = [
        { name: "Common Room", status: "Available", description: "Multi-purpose hall for community events" },
        { name: "Rooftop Garden", status: "Available", description: "Green space with seating areas" },
        { name: "Parking Area", status: "Limited", description: "40 vehicle capacity" },
        { name: "Security System", status: "Active", description: "24/7 CCTV surveillance" },
        { name: "Generator Backup", status: "Active", description: "Full building coverage" },
        { name: "Water Reserve", status: "Available", description: "50,000L capacity" },
    ];

    const emergencyContacts = [
        { title: "Building Manager", name: "Robert Wilson", phone: "555-0123" },
        { title: "Security Desk", name: "Main Gate", phone: "555-0124" },
        { title: "Maintenance", name: "Technical Team", phone: "555-0125" },
        { title: "Emergency Response", name: "Control Room", phone: "555-0126" },
    ];

    const maintenanceSchedule = [
        { service: "Elevator Maintenance", frequency: "Monthly", nextDate: "2025-03-15" },
        { service: "Water Tank Cleaning", frequency: "Quarterly", nextDate: "2025-04-01" },
        { service: "Generator Service", frequency: "Bi-monthly", nextDate: "2025-03-20" },
        { service: "Fire Safety Check", frequency: "Quarterly", nextDate: "2025-04-15" },
    ];

    return (
        <div className="space-y-6">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 -mx-8 px-8 py-12 mb-8">
                <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:6px_6px]" />
                <div className="relative max-w-7xl mx-auto text-white">
                    <h1 className="text-3xl font-bold mb-4">Khondokar Tower</h1>
                    <div className="flex flex-wrap gap-4 text-blue-100">
                        <div className="flex items-center">
                            <MapPin className="w-5 h-5 mr-2" />
                            <span>123 Harmony Street, Cityville</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 mr-2" />
                            <span>Established 2020</span>
                        </div>
                        <div className="flex items-center">
                            <Shield className="w-5 h-5 mr-2" />
                            <span>Premium Residential Complex</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Building Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {buildingFeatures.map((feature, index) => (
                    <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-900">{feature.value}</h3>
                            <p className="text-sm text-gray-500">{feature.title}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Amenities Section */}
                <Card title="Building Amenities" className="h-full">
                    <div className="grid gap-4">
                        {amenities.map((amenity, index) => (
                            <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                <Warehouse className="w-5 h-5 text-blue-600 mt-1 mr-4" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium text-gray-900">{amenity.name}</h3>
                                        <Badge variant={amenity.status === "Available" ? "success" : amenity.status === "Limited" ? "warning" : "info"}>{amenity.status}</Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{amenity.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Emergency Contacts */}
                <Card title="Emergency Contacts" className="h-full">
                    <div className="grid gap-4">
                        {emergencyContacts.map((contact, index) => (
                            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{contact.title}</h3>
                                    <p className="text-sm text-gray-600">{contact.name}</p>
                                    <a href={`tel:${contact.phone}`} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                        {contact.phone}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Maintenance Schedule */}
            <Card title="Maintenance Schedule">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Scheduled</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {maintenanceSchedule.map((schedule, index) => {
                                const nextDate = new Date(schedule.nextDate);
                                const today = new Date();
                                const daysUntil = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                                return (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{schedule.service}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.frequency}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                                {nextDate.toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge variant={daysUntil <= 7 ? "warning" : "success"}>{daysUntil <= 0 ? "Due" : `In ${daysUntil} days`}</Badge>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Building;
