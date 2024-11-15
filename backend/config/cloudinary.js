// config/cloudinary.js
const cloudinary = require("cloudinary").v2;

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: "your-cloud-name", // Thay bằng tên Cloudinary của bạn
    api_key: "your-api-key", // Thay bằng API Key
    api_secret: "your-api-secret", // Thay bằng API Secret
});

module.exports = cloudinary;
