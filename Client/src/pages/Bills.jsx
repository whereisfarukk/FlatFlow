import React, { useState } from "react";
import { Calendar, DollarSign, Filter, Search, Plus, Zap, Calculator, Home, Building2, Check } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
// import { bills, currentUser } from "../data/mockData";
import { currentUser, apartments } from "../data/mockdata2";
import { useEffect } from "react";
import { Loader } from "../components/ui/Loader";
const Bills = () => {
    const [bills, setBills] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [showGenerateBillModal, setShowGenerateBillModal] = useState(false);
    const [selected, setSelected] = useState("all");
    const [billGenerationType, setBillGenerationType] = useState("all");
    const [selectedApartments, setSelectedApartments] = useState([]);
    const [newBill, setNewBill] = useState({
        apartmentNumber: [],
        month: "",
        year: new Date().getFullYear(),
        electricityUnits: "",
        waterUsage: "",
        maintenanceFee: "2500",
        otherCharges: "",
    });
    const dueDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
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
    const handleSelectAllApartments = () => {
        if (selectedApartments.length === apartments.length) {
            setSelectedApartments([]);
        } else {
            setSelectedApartments(apartments.map((apt) => apt.number));
        }
    };
    const handleApartmentSelection = (apartmentNumber) => {
        setSelectedApartments((prev) => (prev.includes(apartmentNumber) ? prev.filter((apt) => apt !== apartmentNumber) : [...prev, apartmentNumber]));
    };
    // console.log(selectedApartments);
    const handleGenerateBill = async (e) => {
        e.preventDefault();
        const totalAmount = calculateBillAmount();
        setNewBill((prev) => ({
            ...prev,
            apartmentNumber: selectedApartments,
        }));
        const bill = {
            ...newBill,
            apartmentNumber: selectedApartments,
            totalAmount,
            isPaid: false,
            billNumber: Date.now().toString(),
        };
        console.log(bill);
        // setIsLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/bills", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bill),
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            alert("Uploaded: " + data.message);
            setShowGenerateBillModal(false);
        } catch (err) {
            console.error(err);
            alert("Upload failed. Please try again.");
        } finally {
            // setIsLoading(false);
        }
        // Reset form and close modal
        setNewBill({
            apartmentNumber: [],
            month: "",
            year: new Date().getFullYear(),
            electricityUnits: "",
            waterUsage: "",
            maintenanceFee: "2500",
            otherCharges: "",
        });
        setShowGenerateBillModal(false);
    };
    const openGenerateBillModal = () => {
        setShowGenerateBillModal(true);
        setBillGenerationType("specific");
        setSelectedApartments([]);
    };
    useEffect(() => {
        const fetchBills = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("http://localhost:3000/api/bills", {
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Failed to fetch bills");

                const data = await res.json();
                setBills(data.data); // assuming your backend returns { data: [...] }
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBills();
    }, []);

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
                                    {!isLoading && (
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
                                    )}
                                    {isLoading && (
                                        <tbody>
                                            <tr>
                                                <td colSpan="6" className="py-8 text-center">
                                                    <Loader />
                                                </td>
                                            </tr>
                                        </tbody>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Generate Bill Modal */}
            <Modal isOpen={showGenerateBillModal} onClose={() => setShowGenerateBillModal(false)} title="Generate New Utility Bill" size="lg">
                <form onSubmit={handleGenerateBill} className="space-y-6">
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg border border-primary/20">
                        <div className="flex items-center">
                            <div className="p-2 bg-primary/10 rounded-full mr-3">
                                <Calculator className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-foreground">Bill Generation</h4>
                                <p className="text-xs text-muted-foreground">Create utility bills for apartments</p>
                            </div>
                        </div>
                    </div>

                    {/* Bill Type Selection */}
                    <div className="space-y-4">
                        <label className="block text-sm font-semibold text-foreground">Bill Generation Type</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${billGenerationType === "all" ? "border-[#2461E8] bg-[#2461E8]/5" : "border-border hover:border-[#2461E8]/50"}`}
                                onClick={() => {
                                    setBillGenerationType("all");
                                    setSelectedApartments(apartments.map((apt) => apt.number));
                                }}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${billGenerationType === "all" ? "border-[#2461E8] bg-[#2461E8]" : "border-border"}`}>{billGenerationType === "all" && <div className="w-2 h-2 bg-white rounded-full" />}</div>
                                    <Building2 className="w-5 h-5 text-primary" />
                                    <div>
                                        <h4 className="font-medium text-foreground">All Apartments</h4>
                                        <p className="text-xs text-muted-foreground">Generate same bill for all apartments</p>
                                    </div>
                                </div>
                            </div>

                            <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${billGenerationType === "specific" ? "border-[#2461E8] bg-[#2461E8]/5" : "border-border hover:border-[#2461E8]/50"}`} onClick={() => setBillGenerationType("specific")}>
                                <div className="flex items-center space-x-3">
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${billGenerationType === "specific" ? "border-[#2461E8] bg-[#2461E8]" : "border-border"}`}>
                                        {billGenerationType === "specific" && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                    <Home className="w-5 h-5 text-primary" />
                                    <div>
                                        <h4 className="font-medium text-foreground">Specific Apartments</h4>
                                        <p className="text-xs text-muted-foreground">Select specific apartments</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Apartment Selection for Specific Type */}
                    {billGenerationType === "specific" && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-semibold text-foreground">Select Apartments</label>
                                <Button type="button" variant="outline" size="sm" onClick={handleSelectAllApartments}>
                                    {selectedApartments.length === apartments.length ? "Deselect All" : "Select All"}
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-4 border border-border rounded-lg bg-muted/30">
                                {apartments.map((apartment) => (
                                    <div
                                        key={apartment.id}
                                        className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedApartments.includes(apartment.number) ? "border-[#2461E8] bg-[#2461E8]/10" : "border-border hover:border-[#2461E8]/50"}`}
                                        onClick={() => handleApartmentSelection(apartment.number)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedApartments.includes(apartment.number) ? "border-[#2461E8] bg-[#2461E8]" : "border-border"}`}>
                                                {selectedApartments.includes(apartment.number) && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">#{apartment.number}</p>
                                                <p className="text-xs text-muted-foreground">{apartment.ownerName}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {selectedApartments.length > 0 && <p className="text-sm text-muted-foreground">{selectedApartments.length} apartment(s) selected</p>}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Month *</label>
                            <select required value={newBill.month} onChange={(e) => setNewBill({ ...newBill, month: e.target.value })} className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground">
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

                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Year</label>
                            <input
                                type="number"
                                value={newBill.year}
                                onChange={(e) => setNewBill({ ...newBill, year: parseInt(e.target.value) })}
                                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                                placeholder="2024"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Electricity Units (kWh)</label>
                            <div className="relative">
                                <Zap className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="number"
                                    step="0.01"
                                    value={newBill.electricityUnits}
                                    onChange={(e) => setNewBill({ ...newBill, electricityUnits: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                                    placeholder="0.00"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Rate: $0.12 per kWh</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Water Usage (Liters)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={newBill.waterUsage}
                                onChange={(e) => setNewBill({ ...newBill, waterUsage: e.target.value })}
                                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                                placeholder="0.00"
                            />
                            <p className="text-xs text-muted-foreground mt-1">Rate: $0.05 per liter</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Maintenance Fee</label>
                            <input
                                type="number"
                                step="0.01"
                                value={newBill.maintenanceFee}
                                onChange={(e) => setNewBill({ ...newBill, maintenanceFee: e.target.value })}
                                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                                placeholder="2500.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Other Charges</label>
                            <input
                                type="number"
                                step="0.01"
                                value={newBill.otherCharges}
                                onChange={(e) => setNewBill({ ...newBill, otherCharges: e.target.value })}
                                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-foreground">Total Bill Amount:</span>
                            <span className="text-xl font-bold text-primary">${calculateBillAmount().toFixed(2)}</span>
                        </div>
                        {billGenerationType === "all" && <p className="text-xs text-muted-foreground mt-1">This amount will be applied to all {apartments.length} apartments</p>}
                        {billGenerationType === "specific" && selectedApartments.length > 0 && <p className="text-xs text-muted-foreground mt-1">This amount will be applied to {selectedApartments.length} selected apartment(s)</p>}
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-border">
                        <Button type="button" variant="secondary" onClick={() => setShowGenerateBillModal(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            <Plus size={16} className="mr-2" />
                            Generate Bill{billGenerationType === "all" ? "s" : selectedApartments.length > 1 ? "s" : ""}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Bills;
