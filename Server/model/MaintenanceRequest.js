const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const MaintenanceRequestSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ["plumbing", "electrical", "hvac", "structural", "appliance", "security", "cleaning", "other"],
            required: true,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high", "emergency"],
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "assigned", "in-progress", "resolved", "cancelled"],
            default: "pending",
        },
        location: {
            type: String,
        },
        apartmentNumber: {
            type: String,
        },
        submittedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        dateSubmitted: {
            type: Date,
            default: Date.now,
        },
        dateAssigned: {
            type: Date,
        },
        // dateStarted: {
        //     type: Date,
        // },
        // dateCompleted: {
        //     type: Date,
        // },
        // estimatedCost: {
        //     type: Number,
        // },
        // actualCost: {
        //     type: Number,
        // },
        // images: [
        //     {
        //         type: String,
        //     },
        // ],
        // comments: [
        //     {
        //         userId: {
        //             type: Schema.Types.ObjectId,
        //             ref: "User",
        //         },
        //         comment: {
        //             type: String,
        //         },
        //         timestamp: {
        //             type: Date,
        //             default: Date.now,
        //         },
        //         isInternal: {
        //             type: Boolean,
        //             default: false,
        //         },
        //     },
        // ],
        // rating: {
        //     score: {
        //         type: Number,
        //         min: 1,
        //         max: 5,
        //     },
        //     feedback: {
        //         type: String,
        //     },
        //     ratedBy: {
        //         type: Schema.Types.ObjectId,
        //         ref: "User",
        //     },
        //     ratedAt: {
        //         type: Date,
        //     },
        // },
        // createdAt: {
        //     type: Date,
        //     default: Date.now,
        // },
        // updatedAt: {
        //     type: Date,
        //     default: Date.now,
        // },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Create indexes
MaintenanceRequestSchema.index({ apartmentNumber: 1 });
MaintenanceRequestSchema.index({ submittedBy: 1 });
MaintenanceRequestSchema.index({ status: 1 });
MaintenanceRequestSchema.index({ priority: 1 });
MaintenanceRequestSchema.index({ category: 1 });
MaintenanceRequestSchema.index({ dateSubmitted: -1 });

// const MaintenanceRequest = mongoose.model("MaintenanceRequest", MaintenanceRequestSchema, "maintenanceRequests");

// module.exports = MaintenanceRequest;

const MaintenanceRequest = model("MaintenanceRequest", MaintenanceRequestSchema);
module.exports = MaintenanceRequest;
