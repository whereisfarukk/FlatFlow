const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            enum: {
                values: ["legal", "financial", "maintenance", "insurance", "certificates", "meeting_minutes"],
                message: "Category must be one of: legal, financial, maintenance, insurance, certificates, meeting_minutes",
            },
            required: [true, "Category is required"],
        },
        fileName: {
            type: String,
            required: [true, "File name is required"],
            trim: true,
        },
        originalName: {
            type: String,
            required: [true, "Original file name is required"],
            trim: true,
        },
        fileUrl: {
            type: String,
            required: [true, "File URL is required"],
            trim: true,
        },
        fileType: {
            type: String,
            required: [true, "File type (MIME) is required"],
            trim: true,
        },
        fileSize: {
            type: Number,
            required: [true, "File size is required"],
            min: [0, "File size cannot be negative"],
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // assuming your user model is named 'User'
            required: [true, "Uploaded by is required"],
        },
        accessLevel: {
            type: String,
            enum: {
                values: ["public", "residents", "committee", "admin"],
                message: "Access level must be one of: public, residents, committee, admin",
            },
            required: [true, "Access level is required"],
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        version: {
            type: Number,
            default: 1,
            min: [1, "Version must be at least 1"],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        downloadCount: {
            type: Number,
            default: 0,
            min: [0, "Download count cannot be negative"],
        },
        expiryDate: {
            type: Date,
        },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }, // maps to your createdAt/updatedAt
    }
);

// Create indexes
documentSchema.index({ category: 1 });
documentSchema.index({ uploadedBy: 1 });
documentSchema.index({ accessLevel: 1 });
documentSchema.index({ isActive: 1 });
documentSchema.index({ createdAt: -1 });

// Optional: Add a compound index if you often query by multiple fields
// Example: documentSchema.index({ category: 1, isActive: 1 });

// Export the model
module.exports = mongoose.model("Document", documentSchema);
