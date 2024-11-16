import AdBlock from "../models/admissionBlock.js";

// Thêm Admission Block mới
export const addAdBlock = async (req, res) => {
    try {
        const {
            admissionBlockId,
            admissionBlockName,
            admissionBlockSubject1,
            admissionBlockSubject2,
            admissionBlockSubject3,
        } = req.body;

        // Kiểm tra xem Admission Block ID đã tồn tại chưa
        const existingAdBlock = await AdBlock.findOne({ admissionBlockId });

        if (existingAdBlock) {
            // Nếu Admission Block ID đã tồn tại
            return res.status(400).json({ message: "Admission Block ID already exists" });
        }

        // Tạo mới Admission Block
        const newAdBlock = new AdBlock({
            admissionBlockId,
            admissionBlockName,
            admissionBlockSubject1,
            admissionBlockSubject2,
            admissionBlockSubject3,
        });

        await newAdBlock.save();
        res.status(201).json({ message: "Admission Block created successfully" });
    } catch (error) {
        console.error("Error adding admission block:", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};
// Lấy toàn bộ Admission Blocks
export const getAllAdBlocks = async (req, res) => {
    try {
        const adBlocks = await AdBlock.find();
        res.status(200).json(adBlocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Cập nhật Admission Block
export const updateAdBlock = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            admissionBlockId,
            admissionBlockName,
            admissionBlockSubject1,
            admissionBlockSubject2,
            admissionBlockSubject3,
        } = req.body;

        // Kiểm tra xem Admission Block ID có trùng với ID của một Admission Block khác không
        const existingAdBlock = await AdBlock.findOne({ admissionBlockId });

        if (existingAdBlock && existingAdBlock._id.toString() !== id) {
            // Nếu Admission Block ID đã tồn tại và không phải là của Block hiện tại
            return res.status(400).json({ message: "Admission Block ID already exists" });
        }

        // Cập nhật thông tin Admission Block
        const updatedAdBlock = await AdBlock.findByIdAndUpdate(
            id,
            {
                admissionBlockId,
                admissionBlockName,
                admissionBlockSubject1,
                admissionBlockSubject2,
                admissionBlockSubject3,
            },
            { new: true, runValidators: true }
        );

        if (!updatedAdBlock) {
            return res.status(404).json({ message: "Admission Block not found" });
        }

        res.status(200).json({ message: "Admission Block updated successfully", updatedAdBlock });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Xóa Admission Block
export const deleteAdBlock = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAdBlock = await AdBlock.findByIdAndDelete(id);

        if (!deletedAdBlock) {
            return res.status(404).json({ message: "Admission Block not found" });
        }

        res.status(200).json({ message: "Admission Block deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
