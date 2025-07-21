const { Schema, model } = require("mongoose");
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 30,
        },
        password: {
            type: String,
            required: true,
        },
        apartmentNumber: {
            type: String,
            index: true, // normal index
            required: true,
        },
        role: {
            type: String,
            enum: ["resident", "admin", "committee"],
            default: "resident",
            required: true,
            index: true, // normal index
        },
        contactNumber: {
            type: String,
        },
        emergencyContact: {
            name: String,
            phone: String,
            relationship: String,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"],
        },

        profileImage: {
            type: String, // URL or base64 string
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: {
            type: Date,
        },
        preferences: {
            notifications: {
                announcements: { type: Boolean, default: true },
                maintenance: { type: Boolean, default: true },
                bills: { type: Boolean, default: true },
                security: { type: Boolean, default: true },
            },
            language: {
                type: String,
                default: "en",
            },
        },
    },
    { timestamps: true }
);
const User = model("User", userSchema);
module.exports = User;
