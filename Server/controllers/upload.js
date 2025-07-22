const fs = require("fs");
const { google } = require("googleapis");
const path = require("path");
const Upload = require("../helpers/upload");

exports.uploadPdf = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    try {
        const upload = await Upload.uploadFile(req.file.path);
        return res.status(201).json({
            success: true,
            message: "Upload successful",
            fileUrl: upload.secure_url.trim(), // trim in case of spaces
            publicId: upload.public_id,
            fileName: upload.original_filename,
        });
    } catch (err) {
        console.error("Upload error:", err);
        return res.status(500).json({
            success: false,
            message: "Upload failed",
            error: err.message,
        });
    }
};
