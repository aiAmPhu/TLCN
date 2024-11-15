// middleware/upload.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Thiết lập lưu trữ với Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "tlcnFolder", // Tên thư mục trên Cloudinary
        allowed_formats: ["jpg", "jpeg", "png"], // Các định dạng ảnh cho phép
        transformation: [
            {
                width: 200, // Chiều rộng mong muốn
                height: 200, // Chiều cao mong muốn
                crop: "fill", // Phương pháp crop: "fill" để resize và crop vừa khung
            },
        ],
    },
});

const upload = multer({ storage: storage });

export default upload;
