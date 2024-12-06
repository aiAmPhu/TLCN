import AdQuantity from "../models/admissionQuantity.js"; // Đổi tên model thành AdQuantity

// Thêm Quantity mới
export const addAdQuantity = async (req, res) => {
    try {
        const { majorId, criteriaId, quantity } = req.body;

        // Kiểm tra xem Quantity ID đã tồn tại chưa
        const existingQuantity = await AdQuantity.findOne({ majorId, criteriaId });

        if (existingQuantity) {
            return res.status(400).json({ message: "Chỉ tiêu này đã được thiết lập" });
        }

        // Tạo mới Quantity
        const newQuantity = new AdQuantity({
            majorId,
            criteriaId,
            quantity,
        });

        await newQuantity.save();
        res.status(201).json({ message: "Thiết lập thành công" });
    } catch (error) {
        console.error("Lỗi: ", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};
export const getQuantityByCriteriaIdAndMajorId = async (req, res) => {
    try {
        const { criteriaId, majorId } = req.params; // Lấy criteriaId và majorId từ tham số URL

        // Tìm các bản ghi trong AdQuantity với criteriaId và majorId tương ứng
        const quantities = await AdQuantity.find({ criteriaId, majorId }).select("quantity");

        if (quantities.length === 0) {
            return res.status(404).json({
                message: `No quantities found for criteriaId: ${criteriaId} and majorId: ${majorId}`,
            });
        }

        // Trả về các quantities tìm được
        res.status(200).json({ message: "Quantities found", data: quantities });
    } catch (error) {
        console.error("Error finding quantities by criteriaId and majorId:", error); // Log lỗi chi tiết
        res.status(500).json({ message: error.message });
    }
};

// Lấy toàn bộ Quantitys
export const getAllAdQuantities = async (req, res) => {
    try {
        const quantities = await AdQuantity.find();
        res.status(200).json(quantities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật Quantity
export const updateAdQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { majorId, criteriaId, quantity } = req.body;

        const existingQuantity = await AdQuantity.findOne({ majorId, criteriaId });

        if (existingQuantity) {
            return res.status(400).json({ message: "Chỉ tiêu này đã được thiết lập" });
        }
        // Cập nhật thông tin Quantity
        const updatedQuantity = await AdQuantity.findByIdAndUpdate(
            id,
            {
                majorId,
                criteriaId,
                quantity,
            },
            { new: true, runValidators: true }
        );

        if (!updatedQuantity) {
            return res.status(404).json({ message: "Lỗi khi cập nhật chỉ tiêu" });
        }

        res.status(200).json({ message: "Thiết lập thành công", updatedQuantity });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa Quantity
export const deleteAdQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuantity = await AdQuantity.findByIdAndDelete(id);

        if (!deletedQuantity) {
            return res.status(404).json({ message: "Lỗi khi xóa chỉ tiêu" });
        }

        res.status(200).json({ message: "Xóa chỉ tiêu thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
