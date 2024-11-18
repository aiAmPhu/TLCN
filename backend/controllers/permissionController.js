import User from "../models/user.js"; // Đổi tên model thành AdMajor

// Thêm Major mới
// export const addAdMajor = async (req, res) => {
//     try {
//         const { majorId, majorCodeName, majorName, majorCombination, majorDescription } = req.body;

//         // Kiểm tra xem Major ID đã tồn tại chưa
//         const existingMajor = await AdMajor.findOne({ majorId });

//         if (existingMajor) {
//             // Nếu Major ID đã tồn tại
//             return res.status(400).json({ message: "Major ID already exists" });
//         }

//         // Tạo mới Major
//         const newMajor = new AdMajor({
//             majorId,
//             majorCodeName,
//             majorName,
//             majorCombination,
//             majorDescription,
//         });

//         await newMajor.save();
//         res.status(201).json({ message: "Major created successfully" });
//     } catch (error) {
//         console.error("Error adding major:", error); // Log chi tiết lỗi
//         res.status(500).json({ message: error.message });
//     }
// };

// Lấy toàn bộ Majors
// export const getAllAdMajors = async (req, res) => {
//     try {
//         const majors = await AdMajor.find();
//         res.status(200).json(majors);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Cập nhật Major
export const updatePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { majorGroup } = req.body;

        // Kiểm tra xem Major ID có trùng với ID của một Major khác không
        //const existingMajor = await AdMajor.findOne({ majorId });

        // if (existingMajor && existingMajor._id.toString() !== id) {
        //     // Nếu Major ID đã tồn tại và không phải là của Major hiện tại
        //     return res.status(400).json({ message: "Major ID already exists" });
        // }

        // Cập nhật thông tin Major
        const updatedPermission = await User.findByIdAndUpdate(
            id,
            {
                majorGroup,
            },
            { new: true, runValidators: true }
        );

        if (!updatedPermission) {
            return res.status(404).json({ message: "User or Major not found" });
        }

        res.status(200).json({ message: "Updated successfully", updatedPermission });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa Major
export const deletePermission = async (req, res) => {
    try {
        const { id } = req.params;

        // Cập nhật trường `majorGroup` thành null
        const deletePermission = await User.findByIdAndUpdate(
            id,
            { majorGroup: null },
            { new: true } // Trả về tài liệu đã cập nhật
        );

        if (!deletePermission) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Deleted successfully", data: deletePermission });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
