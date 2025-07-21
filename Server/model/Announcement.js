const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AnnouncementSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        // category: {
        //   type: String,
        //   enum: ['general', 'maintenance', 'security', 'events', 'emergency'],
        //   default: 'general',
        // },
        priority: {
            type: String,
            enum: ["low", "medium", "high", "urgent"],
            default: "medium",
        },
        isImportant: {
            type: Boolean,
            default: false,
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        targetAudience: {
            type: String,
            enum: ["resident", "admin", "committee"],
            default: "admin",
        },
        // attachments: [
        //     {
        //         filename: { type: String },
        //         url: { type: String },
        //         fileType: { type: String },
        //         size: { type: Number }, // in bytes
        //     },
        // ],
        scheduledFor: {
            type: Date,
        },
        expiresAt: {
            type: Date,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        readBy: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
                readAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Indexes
AnnouncementSchema.index({ postedBy: 1 });
AnnouncementSchema.index({ category: 1 });
AnnouncementSchema.index({ isActive: 1 });
AnnouncementSchema.index({ createdAt: -1 });
AnnouncementSchema.index({ scheduledFor: 1 });

// const Announcement = mongoose.model("Announcement", AnnouncementSchema, "announcements");
const Announcement = model("Announcement", AnnouncementSchema);
module.exports = Announcement;
