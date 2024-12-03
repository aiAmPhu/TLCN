import User from "../models/user.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
const otps = {};

// Thêm User mới
export const addUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, otp, password } = req.body; //, role, pic
        const role = "user";
        const pic = "https://res.cloudinary.com/dlum0st9k/image/upload/v1731705123/pngwing.com_1_x0zbek.png";
        const validOtp = otps[email]; // Lấy OTP đã lưu

        if (!validOtp || parseInt(validOtp) !== parseInt(otp)) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        // Kiểm tra xem email có trùng với bất kỳ người dùng nào ngoài người dùng hiện tại không
        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser._id.toString() !== id) {
            // Nếu email đã tồn tại và không phải là của người dùng hiện tại
            return res.status(400).json({ message: "Email already exists" });
        }
        const user = new User({ name, email, password, role, pic });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
        delete otps[email];
    } catch (error) {
        console.error("Error adding user:", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};
export const sendOTP = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
        // Tạo OTP ngẫu nhiên 6 chữ số
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Lưu OTP và email tạm thời
        otps[email] = otp;
        setTimeout(() => {
            delete otps[email];
        }, 30 * 1000); // 5 phút

        // Cấu hình nodemailer
        const transporter = nodemailer.createTransport({
            service: "Gmail", // hoặc khác như Outlook, Yahoo
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "bophantuyensinhute@gmail.com", // Thay bằng email thực
                //pass: process.env.EMAIL_PASSWORD, // Thay bằng mật khẩu thực hoặc App Password
                pass: "aibizhfweaounepw",
            },
        });

        // Nội dung email
        const mailOptions = {
            from: "Bộ phận tuyển sinh UTE",
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
        };

        // Gửi email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "OTP sent to email" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Failed to send OTP" });
    }
};
// Lấy toàn bộ Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật User
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role, pic } = req.body;

        // Kiểm tra xem email có trùng với bất kỳ người dùng nào ngoài người dùng hiện tại không
        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser._id.toString() !== id) {
            // Nếu email đã tồn tại và không phải là của người dùng hiện tại
            return res.status(400).json({ message: "Email already exists" });
        }

        // Cập nhật thông tin người dùng
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password, role, pic },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa User
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
