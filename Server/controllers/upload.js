const fs = require("fs");
const { google } = require("googleapis");
const path = require("path");
const Upload = require("../helpers/upload");
const Document = require("../model/Document");
exports.uploadPdf = async (req, res, next) => {
    try {
        const { title, description, category } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "File is required." });
        }

        const file = req.file;

        const upload = await Upload.uploadFile(req.file.path);
        // return res.status(201).json({
        //     success: true,
        //     message: "Upload successful",
        //     fileUrl: upload.secure_url.trim(),
        //     publicId: upload.public_id,
        //     fileName: upload.original_filename,
        // });

        const newDoc = new Document({
            title,
            description,
            category,
            fileName: file.filename,
            originalName: file.originalname,
            fileUrl: upload.secure_url.trim(),
            fileType: file.mimetype,
            fileSize: file.size,
            uploadedBy: req.user?._id || "000000000000000000000000",
            accessLevel: "residents",
            tags: [],
            expiryDate: null,
        });

        const savedDoc = await newDoc.save();

        return res.status(201).json({
            message: "Document uploaded successfully",
            document: savedDoc,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ error: "Failed to upload document" });
    }
};
