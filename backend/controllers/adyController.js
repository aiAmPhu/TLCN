import AdYear from "../models/admissionYear.js"; // Đổi tên model thành AdMajor

// Thêm Major mới
export const addAdYear = async (req, res) => {
    try {
        const { yearId, yearName, startDate, endDate, yearMajors } = req.body;

        // Kiểm tra xem Major ID đã tồn tại chưa
        const existingYear = await AdYear.findOne({ yearId });

        if (existingYear) {
            // Nếu Major ID đã tồn tại
            return res.status(400).json({ message: "ID already exists" });
        }

        // Tạo mới Major
        const newYear = new AdYear({
            yearId,
            yearName,
            startDate,
            endDate,
            yearMajors,
        });

        await newYear.save();
        res.status(201).json({ message: "Created successfully" });
    } catch (error) {
        console.error("Error:", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};

// Lấy toàn bộ Majors
export const getAllAdYears = async (req, res) => {
    try {
        const years = await AdYear.find();
        res.status(200).json(years);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật Major
export const updateAdYear = async (req, res) => {
    try {
        const { id } = req.params;
        const { yearId, yearName, startDate, endDate, yearMajors } = req.body;
        console.log(req.body);
        // Kiểm tra xem Major ID có trùng với ID của một Major khác không
        const existingYear = await AdYear.findOne({ yearId });

        if (existingYear && existingYear._id.toString() !== id) {
            // Nếu Major ID đã tồn tại và không phải là của Major hiện tại
            return res.status(400).json({ message: "Major ID already exists" });
        }

        // Cập nhật thông tin Major
        const updatedYear = await AdYear.findByIdAndUpdate(
            id,
            {
                yearId,
                yearName,
                startDate,
                endDate,
                yearMajors,
            },
            { new: true, runValidators: true }
        );

        if (!updatedYear) {
            return res.status(404).json({ message: "Major not found" });
        }

        res.status(200).json({ message: "Major updated successfully", updatedYear });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa Major
export const deleteAdYear = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedYear = await AdYear.findByIdAndDelete(id);

        if (!deletedYear) {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
