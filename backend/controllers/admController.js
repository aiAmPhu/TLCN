import AdMajor from "../models/admissionMajor.js"; // Đổi tên model thành AdMajor

// Thêm Major mới
export const addAdMajor = async (req, res) => {
    try {
        const { majorId, majorCodeName, majorName, majorCombination, majorDescription } = req.body;

        // Kiểm tra xem Major ID đã tồn tại chưa
        const existingMajor = await AdMajor.findOne({ majorId });

        if (existingMajor) {
            // Nếu Major ID đã tồn tại
            return res.status(400).json({ message: "Major ID already exists" });
        }

        // Tạo mới Major
        const newMajor = new AdMajor({
            majorId,
            majorCodeName,
            majorName,
            majorCombination,
            majorDescription,
        });

        await newMajor.save();
        res.status(201).json({ message: "Major created successfully" });
    } catch (error) {
        console.error("Error adding major:", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};

// Lấy toàn bộ Majors
export const getAllAdMajors = async (req, res) => {
    try {
        const majors = await AdMajor.find();
        res.status(200).json(majors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getMajorCombinationByName = async (req, res) => {
    const { majorId } = req.params; // Lấy majorName từ tham số URL

    try {
        // Tìm kiếm major theo majorName
        const major = await AdMajor.findOne({ majorId: majorId });

        if (!major) {
            return res.status(404).json({ message: "Major not found" });
        }

        // Trả về majorCombination
        res.status(200).json({ majorCombination: major.majorCombination });
    } catch (error) {
        // Xử lý lỗi
        res.status(500).json({ message: error.message });
    }
};
// Cập nhật Major
export const updateAdMajor = async (req, res) => {
    try {
        const { id } = req.params;
        const { majorId, majorCodeName, majorName, majorCombination, majorDescription } = req.body;

        // Kiểm tra xem Major ID có trùng với ID của một Major khác không
        const existingMajor = await AdMajor.findOne({ majorId });

        if (existingMajor && existingMajor._id.toString() !== id) {
            // Nếu Major ID đã tồn tại và không phải là của Major hiện tại
            return res.status(400).json({ message: "Major ID already exists" });
        }

        // Cập nhật thông tin Major
        const updatedMajor = await AdMajor.findByIdAndUpdate(
            id,
            {
                majorId,
                majorCodeName,
                majorName,
                majorCombination,
                majorDescription,
            },
            { new: true, runValidators: true }
        );

        if (!updatedMajor) {
            return res.status(404).json({ message: "Major not found" });
        }

        res.status(200).json({ message: "Major updated successfully", updatedMajor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa Major
export const deleteAdMajor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMajor = await AdMajor.findByIdAndDelete(id);

        if (!deletedMajor) {
            return res.status(404).json({ message: "Major not found" });
        }

        res.status(200).json({ message: "Major deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
