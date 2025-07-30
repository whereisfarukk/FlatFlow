const mongoose = require("mongoose");

const financialRecordSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["income", "expense"],
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        date: {
            type: Date,
            required: true,
        },
        month: {
            type: String,
            required: true,
            trim: true,
        },
        year: {
            type: Number,
            required: true,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high", "urgent"],
            default: "medium",
        },
        apartmentNumber: {
            type: String,
            trim: true,
        },
        submittedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        approvedBy: {
            type: String,
            trim: true,
        },
        receiptNumber: {
            type: String,
            trim: true,
        },
        paymentMethod: {
            type: String,
            trim: true,
        },
        vendor: {
            name: {
                type: String,
                trim: true,
            },
            contact: {
                type: String,
                trim: true,
            },
            address: {
                type: String,
                trim: true,
            },
        },
        attachments: [
            {
                type: String,
                trim: true,
            },
        ],
        isRecurring: {
            type: Boolean,
            default: false,
        },
        recurringPattern: {
            frequency: {
                type: String,
                enum: ["monthly", "quarterly", "yearly"],
            },
            nextDue: {
                type: Date,
            },
        },
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt
    }
);

// Indexes
financialRecordSchema.index({ type: 1 });
financialRecordSchema.index({ category: 1 });
financialRecordSchema.index({ month: 1, year: 1 });
financialRecordSchema.index({ date: -1 });
financialRecordSchema.index({ apartmentNumber: 1 });

// Optional: Compound index for recurring payments
// financialRecordSchema.index({ isRecurring: 1, 'recurringPattern.nextDue': 1 });

const FinancialRecord = mongoose.model("FinancialRecord", financialRecordSchema);

module.exports = FinancialRecord;
