import React, { useState } from "react";
import { Camera, Mail, Phone, Home, Calendar, MapPin, Clock, Shield, Edit2 } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { currentUser } from "../data/mockData";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        bio: "Resident at Khondokar Tower since 2025. Active community member and nature enthusiast.",
        phone: currentUser.contactNumber || "+1 (555) 123-4567",
        emergencyContact: "Sarah Johnson - +1 (555) 987-6543",
        occupation: "Software Engineer",
        interests: ["Community Events", "Gardening", "Book Club"],
        preferredLanguage: "English",
    });

    const handleSave = () => {
        setIsEditing(false);
        // Handle save logic here
    };

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 -mx-8 px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-xl">{currentUser.name.charAt(0)}</div>
                            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                                <Camera size={20} className="text-blue-600" />
                            </button>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-white">{currentUser.name}</h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-blue-100">
                                <div className="flex items-center">
                                    <Home size={16} className="mr-2" />
                                    <span>Apartment #{currentUser.apartmentNumber}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar size={16} className="mr-2" />
                                    <span>Member since Jan 2025</span>
                                </div>
                                <div className="flex items-center">
                                    <Shield size={16} className="mr-2" />
                                    <span>Verified Resident</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:ml-auto">
                            <Button variant="secondary" leftIcon={<Edit2 size={16} />} className="bg-white text-blue-800 hover:bg-blue-50" onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? "Cancel Editing" : "Edit Profile"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Profile Information */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <div className="prose max-w-none">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
                            {isEditing ? <textarea className="w-full p-3 border border-gray-300 rounded-md" value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} rows={4} /> : <p className="text-gray-600">{profileData.bio}</p>}
                        </div>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Phone Number</p>
                                        {isEditing ? (
                                            <input type="tel" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} />
                                        ) : (
                                            <p className="text-sm text-gray-600">{profileData.phone}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Email Address</p>
                                        <p className="text-sm text-gray-600">{currentUser.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Emergency Contact</p>
                                        {isEditing ? (
                                            <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" value={profileData.emergencyContact} onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })} />
                                        ) : (
                                            <p className="text-sm text-gray-600">{profileData.emergencyContact}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {isEditing && (
                        <div className="flex justify-end">
                            <Button variant="primary" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </div>
                    )}
                </div>

                {/* Side Information */}
                <div className="space-y-6">
                    <Card>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Occupation</label>
                                {isEditing ? (
                                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" value={profileData.occupation} onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })} />
                                ) : (
                                    <p className="mt-1 text-sm text-gray-600">{profileData.occupation}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Interests</label>
                                <div className="mt-2">
                                    {isEditing ? (
                                        <div className="space-y-2">
                                            {profileData.interests.map((interest, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                                                    value={interest}
                                                    onChange={(e) => {
                                                        const newInterests = [...profileData.interests];
                                                        newInterests[index] = e.target.value;
                                                        setProfileData({ ...profileData, interests: newInterests });
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.interests.map((interest, index) => (
                                                <Badge key={index} variant="secondary">
                                                    {interest}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
                                {isEditing ? (
                                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" value={profileData.preferredLanguage} onChange={(e) => setProfileData({ ...profileData, preferredLanguage: e.target.value })}>
                                        <option>English</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                        <option>German</option>
                                    </select>
                                ) : (
                                    <p className="mt-1 text-sm text-gray-600">{profileData.preferredLanguage}</p>
                                )}
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Activity Status</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Last Active</span>
                                <Badge variant="success">Online Now</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Community Events Attended</span>
                                <span className="font-medium text-gray-900">12</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Maintenance Requests</span>
                                <span className="font-medium text-gray-900">3</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
