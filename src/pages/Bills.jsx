import React, { useState } from "react";
import { Calendar, DollarSign, Filter, Search, Plus, Zap, Home, Calculator } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { bills, currentUser } from "../data/mockData";

const Bills = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [showGenerateBillModal, setShowGenerateBillModal] = useState(false);
    const [newBill, setNewBill] = useState({
        apartmentNumber: "",
        month: "",
        year: new Date().getFullYear(),
        electricityUnits: "",
        waterUsage: "",
        maintenanceFee: "2500",
        otherCharges: "",
    });

    const filteredBills = bills.filter((bill) => {
        const matchesSearch = bill.apartmentNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMonth = selectedMonth === "all" || bill.month.toLowerCase() === selectedMonth.toLowerCase();
        const matchesStatus = selectedStatus === "all" || (selectedStatus === "paid" && bill.isPaid) || (selectedStatus === "unpaid" && !bill.isPaid);
        return matchesSearch && matchesMonth && matchesStatus;
    });

    const totalAmount = filteredBills.reduce((sum, bill) => sum + bill.amount, 0);
    const paidAmount = filteredBills.filter((bill) => bill.isPaid).reduce((sum, bill) => sum + bill.amount, 0);
    const unpaidAmount = totalAmount - paidAmount;

    const calculateBillAmount = () => {
        const electricity = parseFloat(newBill.electricityUnits) * 0.12 || 0; // 0.12 per unit
        const water = parseFloat(newBill.waterUsage) * 0.05 || 0; // 0.05 per liter
        const maintenance = parseFloat(newBill.maintenanceFee) || 0;
        const other = parseFloat(newBill.otherCharges) || 0;
        return electricity + water + maintenance + other;
    };

    const handleGenerateBill = (e) => {
        e.preventDefault();
        const totalAmount = calculateBillAmount();

        // Here you would typically send the data to your backend
        console.log("New bill generated:", {
            ...newBill,
            totalAmount,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days from now
            isPaid: false,
            id: Date.now().toString(),
        });

        // Reset form and close modal
        setNewBill({
            apartmentNumber: "",
            month: "",
            year: new Date().getFullYear(),
            electricityUnits: "",
            waterUsage: "",
            maintenanceFee: "2500",
            otherCharges: "",
        });
        setShowGenerateBillModal(false);

        alert("Bill generated successfully!");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Utility Bills</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage and track utility bills</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    {currentUser.role === "admin" && (
                        <Button variant="primary" leftIcon={<DollarSign size={16} />} onClick={() => setShowGenerateBillModal(true)}>
                            Generate Bills
                        </Button>
                    )}
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <Card>
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                            <DollarSign size={24} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium text-gray-500">Total Amount</p>
                            <p className="mt-1 text-xl font-semibold text-gray-900">${totalAmount.toFixed(2)}</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600">
                            <DollarSign size={24} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium text-gray-500">Paid Amount</p>
                            <p className="mt-1 text-xl font-semibold text-gray-900">${paidAmount.toFixed(2)}</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-red-100 text-red-600">
                            <DollarSign size={24} />
                        </div>
                        <div className="ml-5">
                            <p className="text-sm font-medium text-gray-500">Unpaid Amount</p>
                            <p className="mt-1 text-xl font-semibold text-gray-900">${unpaidAmount.toFixed(2)}</p>
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
                        <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search by apartment number..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                            <option value="all">All Months</option>
                            <option value="january">January</option>
                            <option value="february">February</option>
                            <option value="march">March</option>
                            <option value="april">April</option>
                            <option value="may">May</option>
                            <option value="june">June</option>
                        </select>

                        <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                            <option value="all">All Status</option>
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                        </select>

                        <Button variant="secondary" leftIcon={<Filter size={16} />}>
                            More Filters
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Bills Table */}
            <Card>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Apartment
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Month
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Due Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Payment Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredBills.map((bill) => (
                                            <tr key={bill.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{bill.apartmentNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {bill.month} {bill.year}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${bill.amount.toFixed(2)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(bill.dueDate).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge variant={bill.isPaid ? "success" : "danger"}>{bill.isPaid ? "Paid" : "Unpaid"}</Badge>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.paidDate ? new Date(bill.paidDate).toLocaleDateString() : "-"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Generate Bill Modal */}
            <Modal isOpen={showGenerateBillModal} onClose={() => setShowGenerateBillModal(false)} title="Generate New Utility Bill" size="lg">
                <form onSubmit={handleGenerateBill} className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-full mr-3">
                                <Calculator className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-green-900">Bill Generation</h4>
                                <p className="text-xs text-green-700">Create utility bill for apartment</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Apartment Number *</label>
                            <div className="relative">
                                <Home className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    required
                                    value={newBill.apartmentNumber}
                                    onChange={(e) => setNewBill({ ...newBill, apartmentNumber: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., 301"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Month *</label>
                            <select required value={newBill.month} onChange={(e) => setNewBill({ ...newBill, month: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Select Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Electricity Units (kWh)</label>
                            <div className="relative">
                                <Zap className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input
                                    type="number"
                                    step="0.01"
                                    value={newBill.electricityUnits}
                                    onChange={(e) => setNewBill({ ...newBill, electricityUnits: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="0.00"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Rate: $0.12 per kWh</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Water Usage (Liters)</label>
                            <input type="number" step="0.01" value={newBill.waterUsage} onChange={(e) => setNewBill({ ...newBill, waterUsage: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="0.00" />
                            <p className="text-xs text-gray-500 mt-1">Rate: $0.05 per liter</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Maintenance Fee</label>
                            <input
                                type="number"
                                step="0.01"
                                value={newBill.maintenanceFee}
                                onChange={(e) => setNewBill({ ...newBill, maintenanceFee: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="2500.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Other Charges</label>
                            <input
                                type="number"
                                step="0.01"
                                value={newBill.otherCharges}
                                onChange={(e) => setNewBill({ ...newBill, otherCharges: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-blue-900">Total Bill Amount:</span>
                            <span className="text-xl font-bold text-blue-900">${calculateBillAmount().toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Button type="button" variant="secondary" onClick={() => setShowGenerateBillModal(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" leftIcon={<Plus size={16} />}>
                            Generate Bill
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Bills;
