import React, { useState } from "react";
import { Download, Filter, TrendingUp, TrendingDown, DollarSign, Users, Calendar, AlertCircle, CheckCircle, Clock, Plus, Save } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import { buildingFund, monthlyCollections, monthlyExpenses, currentUser } from "../data/mockData";

const Finances = () => {
    const [selectedMonth, setSelectedMonth] = useState("March");
    const [selectedYear, setSelectedYear] = useState(2025);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [newExpense, setNewExpense] = useState({
        category: "",
        description: "",
        amount: "",
        priority: "medium",
        approvedBy: currentUser.name,
    });

    // Get unique months and years from data
    const availableMonths = Array.from(new Set(monthlyCollections.map((c) => c.month)));
    const availableYears = Array.from(new Set(monthlyCollections.map((c) => c.year)));

    // Filter data based on selected month/year
    const currentMonthCollection = monthlyCollections.find((c) => c.month === selectedMonth && c.year === selectedYear);

    const currentMonthExpenses = monthlyExpenses.filter((e) => e.month === selectedMonth && e.year === selectedYear);

    // Calculate totals
    const totalCollected = monthlyCollections.reduce((sum, c) => sum + c.totalCollected, 0);
    const totalSpent = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0);
    const currentBalance = totalCollected - totalSpent;

    const currentMonthTotal = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const currentMonthIncome = currentMonthCollection?.totalCollected || 0;
    const currentMonthBalance = currentMonthIncome - currentMonthTotal;

    // Group expenses by category for current month
    const expensesByCategory = currentMonthExpenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    // Calculate collection rate
    const collectionRate = currentMonthCollection ? (currentMonthCollection.paidApartments / currentMonthCollection.totalApartments) * 100 : 0;

    const handleAddExpense = (e) => {
        e.preventDefault();

        // Here you would typically send the data to your backend
        console.log("New expense added:", {
            ...newExpense,
            id: Date.now().toString(),
            month: selectedMonth,
            year: selectedYear,
            date: new Date().toISOString().split("T")[0],
            amount: parseFloat(newExpense.amount),
        });

        // Reset form and close modal
        setNewExpense({
            category: "",
            description: "",
            amount: "",
            priority: "medium",
            approvedBy: currentUser.name,
        });
        setShowAddExpenseModal(false);

        alert("Expense added successfully!");
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

    const getCategoryIcon = (category) => {
        switch (category.toLowerCase()) {
            case "security guards salary":
                return "👮‍♂️";
            case "generator fuel":
                return "⛽";
            case "water tank cleaning":
                return "💧";
            case "lift servicing":
                return "🛗";
            case "committee furniture":
                return "🪑";
            case "common area electricity":
                return "💡";
            case "emergency repairs":
                return "🔧";
            case "miscellaneous":
                return "📦";
            default:
                return "💰";
        }
    };

    const expenseCategories = ["Security Guards Salary", "Generator Fuel", "Water Tank Cleaning", "Lift Servicing", "Committee Furniture", "Common Area Electricity", "Emergency Repairs", "Miscellaneous"];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 -mx-8 px-8 py-8 mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-white">
                            <h1 className="text-3xl font-bold">Building Fund Management</h1>
                            <p className="mt-2 text-emerald-100">Track monthly contributions and expenses transparently</p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex space-x-3">
                            {currentUser.role === "admin" && (
                                <Button variant="secondary" leftIcon={<Plus size={16} />} className="bg-white text-emerald-800 hover:bg-emerald-50" onClick={() => setShowAddExpenseModal(true)}>
                                    Add Expense
                                </Button>
                            )}
                            <Button variant="secondary" leftIcon={<Filter size={16} />} className="bg-white text-emerald-800 hover:bg-emerald-50">
                                Filter
                            </Button>
                            <Button variant="secondary" leftIcon={<Download size={16} />} className="bg-white text-emerald-800 hover:bg-emerald-50">
                                Export Report
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Month/Year Selector */}
            <Card>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <Calendar className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Select Period</h3>
                    </div>
                    <div className="flex space-x-3">
                        <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                            {availableMonths.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5" value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                            {availableYears.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </Card>

            {/* Overall Fund Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium">Current Fund Balance</p>
                            <p className="text-2xl font-bold">৳{currentBalance.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-blue-600 bg-opacity-30 rounded-full">
                            <DollarSign size={24} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        {currentBalance > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                        <span className="text-sm text-blue-100">{currentBalance > 0 ? "Positive Balance" : "Deficit"}</span>
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-emerald-100 text-sm font-medium">Total Collected</p>
                            <p className="text-2xl font-bold">৳{totalCollected.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-emerald-600 bg-opacity-30 rounded-full">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-emerald-100">From all apartments</div>
                </Card>

                <Card className="bg-gradient-to-br from-red-500 to-red-700 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-red-100 text-sm font-medium">Total Expenses</p>
                            <p className="text-2xl font-bold">৳{totalSpent.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-red-600 bg-opacity-30 rounded-full">
                            <TrendingDown size={24} />
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-red-100">All time spending</div>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm font-medium">Collection Rate</p>
                            <p className="text-2xl font-bold">{collectionRate.toFixed(1)}%</p>
                        </div>
                        <div className="p-3 bg-purple-600 bg-opacity-30 rounded-full">
                            <Users size={24} />
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-purple-100">
                        {currentMonthCollection?.paidApartments || 0} of {currentMonthCollection?.totalApartments || 30} paid
                    </div>
                </Card>
            </div>

            {/* Monthly Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Collection Status */}
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">
                            {selectedMonth} {selectedYear} Collection
                        </h3>
                        <Badge variant={collectionRate === 100 ? "success" : collectionRate >= 90 ? "warning" : "danger"}>{collectionRate.toFixed(1)}% Collected</Badge>
                    </div>

                    {currentMonthCollection && (
                        <div className="space-y-4">
                            <div className="bg-emerald-50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-emerald-800">Expected Collection</span>
                                    <span className="text-lg font-bold text-emerald-900">৳{currentMonthCollection.totalExpected.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-emerald-800">Actual Collection</span>
                                    <span className="text-lg font-bold text-emerald-900">৳{currentMonthCollection.totalCollected.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-emerald-800">Per Apartment</span>
                                    <span className="text-lg font-bold text-emerald-900">৳{currentMonthCollection.contributionPerApartment.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-green-50 rounded-lg">
                                    <div className="flex items-center justify-center mb-2">
                                        <CheckCircle className="w-5 h-5 text-green-600 mr-1" />
                                        <span className="text-sm font-medium text-green-800">Paid</span>
                                    </div>
                                    <span className="text-2xl font-bold text-green-900">{currentMonthCollection.paidApartments}</span>
                                </div>
                                <div className="text-center p-3 bg-red-50 rounded-lg">
                                    <div className="flex items-center justify-center mb-2">
                                        <Clock className="w-5 h-5 text-red-600 mr-1" />
                                        <span className="text-sm font-medium text-red-800">Pending</span>
                                    </div>
                                    <span className="text-2xl font-bold text-red-900">{currentMonthCollection.unpaidApartments}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Monthly Balance */}
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">
                            {selectedMonth} {selectedYear} Balance
                        </h3>
                        <Badge variant={currentMonthBalance >= 0 ? "success" : "danger"}>{currentMonthBalance >= 0 ? "Surplus" : "Deficit"}</Badge>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-800">Monthly Income</span>
                                <span className="text-lg font-bold text-blue-900">৳{currentMonthIncome.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-800">Monthly Expenses</span>
                                <span className="text-lg font-bold text-blue-900">৳{currentMonthTotal.toLocaleString()}</span>
                            </div>
                            <div className="border-t border-blue-200 pt-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-blue-800">Net Balance</span>
                                    <span className={`text-xl font-bold ${currentMonthBalance >= 0 ? "text-green-600" : "text-red-600"}`}>৳{currentMonthBalance.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Expense Categories Breakdown */}
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-gray-700">Expense Categories</h4>
                            {Object.entries(expensesByCategory).map(([category, amount]) => (
                                <div key={category} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                                    <div className="flex items-center">
                                        <span className="mr-2">{getCategoryIcon(category)}</span>
                                        <span className="text-sm font-medium text-gray-700">{category}</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">৳{amount.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Detailed Expense List */}
            <Card>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                        {selectedMonth} {selectedYear} Detailed Expenses
                    </h3>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Total:</span>
                        <span className="text-lg font-bold text-gray-900">৳{currentMonthTotal.toLocaleString()}</span>
                    </div>
                </div>

                {currentMonthExpenses.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved By</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentMonthExpenses
                                    .sort((a, b) => b.amount - a.amount)
                                    .map((expense) => (
                                        <tr key={expense.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="mr-2">{getCategoryIcon(expense.category)}</span>
                                                    <span className="text-sm font-medium text-gray-900">{expense.category}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{expense.description}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-gray-900">৳{expense.amount.toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge variant={getPriorityColor(expense.priority)}>{expense.priority}</Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{expense.approvedBy}</div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No expenses recorded</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            No expenses found for {selectedMonth} {selectedYear}
                        </p>
                    </div>
                )}
            </Card>

            {/* Add Expense Modal */}
            <Modal isOpen={showAddExpenseModal} onClose={() => setShowAddExpenseModal(false)} title="Add New Expense" size="lg">
                <form onSubmit={handleAddExpense} className="space-y-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-emerald-100 rounded-full mr-3">
                                <DollarSign className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-emerald-900">
                                    Adding Expense for {selectedMonth} {selectedYear}
                                </h4>
                                <p className="text-xs text-emerald-700">This will be recorded in the building fund</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Expense Category *</label>
                            <select required value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                                <option value="">Select Category</option>
                                {expenseCategories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (৳) *</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={newExpense.amount}
                                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                        <textarea
                            required
                            rows={3}
                            value={newExpense.description}
                            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                            placeholder="Detailed description of the expense..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Priority Level</label>
                        <select value={newExpense.priority} onChange={(e) => setNewExpense({ ...newExpense, priority: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Approved By</label>
                        <input
                            type="text"
                            value={newExpense.approvedBy}
                            onChange={(e) => setNewExpense({ ...newExpense, approvedBy: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Name of approving authority"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Button type="button" variant="secondary" onClick={() => setShowAddExpenseModal(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" leftIcon={<Save size={16} />}>
                            Add Expense
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Finances;
