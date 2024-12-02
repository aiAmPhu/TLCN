import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
console.log("SECRET_KEY:", process.env.SECRET_KEY);
export const loginFunction = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Kiểm tra xem Region ID đã tồn tại chưa
        const user = await User.findOne({ email, password, role });

        if (!user) {
            // Nếu Region ID đã tồn tại
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Tạo token
        const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "24h" });

        res.json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error("Error:", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};
export const protectedFunction = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ headers

        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            res.json({ message: "Access granted", user: decoded });
        } catch (err) {
            res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        console.error("Error:", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};
