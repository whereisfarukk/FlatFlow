// models/Meeting.js
const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Meeting title is required"],
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"],
    },
    meetingType: {
        type: String,
        required: [true, "Meeting type is required"],
        enum: {
            values: ["general_body", "committee", "emergency", "social"],
            message: "Invalid meeting type",
        },
    },
    date: {
        type: Date,
        required: [true, "Meeting date is required"],
    },
    time: {
        type: String,
        required: [true, "Meeting time is required"],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format, use HH:MM"],
    },
    duration: {
        type: Number,
        required: [true, "Duration is required"],
        min: [15, "Duration must be at least 15 minutes"],
        validate: {
            validator: Number.isInteger,
            message: "Duration must be an integer (in minutes)",
        },
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,
    },
    agenda: {
        type: String,
        required: [true, "Agenda is required"],
        trim: true,
    },
    priority: {
        type: String,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Meeting must be created by a user"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

meetingSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

meetingSchema.index({ date: 1, time: 1 });

module.exports = mongoose.model("Meeting", meetingSchema);
