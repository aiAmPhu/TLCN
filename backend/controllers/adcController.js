import AdCriteria from "../models/admissionCriteria.js"; // Đổi tên model thành AdCriteria

// Thêm Criteria mới
export const addAdCriteria = async (req, res) => {
    try {
        const { criteriaId, criteriaName, criteriaDescription } = req.body;

        // Kiểm tra xem Criteria ID đã tồn tại chưa
        const existingCriteria = await AdCriteria.findOne({ criteriaId });

        if (existingCriteria) {
            // Nếu Criteria ID đã tồn tại
            return res.status(400).json({ message: "ID already exists" });
        }

        // Tạo mới Criteria
        const newCriteria = new AdCriteria({
            criteriaId,
            criteriaName,
            criteriaDescription,
        });

        await newCriteria.save();
        res.status(201).json({ message: "Created successfully" });
    } catch (error) {
        console.error("Error: ", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};

// Lấy toàn bộ Criterias
export const getAllAdCriterias = async (req, res) => {
    try {
        const criterias = await AdCriteria.find();
        res.status(200).json(criterias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật Criteria
export const updateAdCriteria = async (req, res) => {
    try {
        const { id } = req.params;
        const { criteriaId, criteriaName, criteriaDescription } = req.body;
        // Kiểm tra xem Criteria ID có trùng với ID của một Criteria khác không
        const existingCriteria = await AdCriteria.findOne({ criteriaId });

        if (existingCriteria && existingCriteria._id.toString() !== id) {
            // Nếu Criteria ID đã tồn tại và không phải là của Criteria hiện tại
            return res.status(400).json({ message: "Criteria ID already exists" });
        }

        // Cập nhật thông tin Criteria
        const updatedCriteria = await AdCriteria.findByIdAndUpdate(
            id,
            {
                criteriaId,
                criteriaName,
                criteriaDescription,
            },
            { new: true, runValidators: true }
        );

        if (!updatedCriteria) {
            return res.status(404).json({ message: "Criteria not found" });
        }

        res.status(200).json({ message: "Criteria updated successfully", updatedCriteria });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa Criteria
export const deleteAdCriteria = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCriteria = await AdCriteria.findByIdAndDelete(id);

        if (!deletedCriteria) {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
