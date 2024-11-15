import User from "../models/user.js";

// Thêm User mới
export const addUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role, pic } = req.body;
        // Kiểm tra xem email có trùng với bất kỳ người dùng nào ngoài người dùng hiện tại không
        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser._id.toString() !== id) {
            // Nếu email đã tồn tại và không phải là của người dùng hiện tại
            return res.status(400).json({ message: "Email already exists" });
        }
        const user = new User({ name, email, password, role, pic });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error adding user:", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
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
