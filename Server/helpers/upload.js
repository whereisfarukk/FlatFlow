const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadFile = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
        });
        console.log("Cloudinary upload successful:", result.secure_url);
        return result;
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        throw error;
    } finally {
        try {
            fs.unlinkSync(filePath);
        } catch (unlinkError) {
            console.warn("Failed to delete local file:", unlinkError.message);
        }
    }
};

module.exports = {
    uploadFile,
};
