import AdRegion from "../models/admissionRegion.js"; // Đổi tên model thành AdRegion

// Thêm Region mới
export const addAdRegion = async (req, res) => {
    try {
        const { regionId, regionName, regionScored } = req.body;

        // Kiểm tra xem Region ID đã tồn tại chưa
        const existingRegion = await AdRegion.findOne({ regionId });

        if (existingRegion) {
            // Nếu Region ID đã tồn tại
            return res.status(400).json({ message: "Region ID already exists" });
        }

        // Tạo mới Region
        const newRegion = new AdRegion({
            regionId,
            regionName,
            regionScored,
        });

        await newRegion.save();
        res.status(201).json({ message: "Region created successfully" });
    } catch (error) {
        console.error("Error adding region:", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};

// Lấy toàn bộ Regions
export const getAllAdRegions = async (req, res) => {
    try {
        const regions = await AdRegion.find();
        res.status(200).json(regions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật Region
export const updateAdRegion = async (req, res) => {
    try {
        const { id } = req.params;
        const { regionId, regionName, regionScored } = req.body;

        // Kiểm tra xem Region ID có trùng với ID của một Region khác không
        const existingRegion = await AdRegion.findOne({ regionId });

        if (existingRegion && existingRegion._id.toString() !== id) {
            // Nếu Region ID đã tồn tại và không phải là của Region hiện tại
            return res.status(400).json({ message: "Region ID already exists" });
        }

        // Cập nhật thông tin Region
        const updatedRegion = await AdRegion.findByIdAndUpdate(
            id,
            {
                regionId,
                regionName,
                regionScored,
            },
            { new: true, runValidators: true }
        );

        if (!updatedRegion) {
            return res.status(404).json({ message: "Region not found" });
        }

        res.status(200).json({ message: "Region updated successfully", updatedRegion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa Region
export const deleteAdRegion = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRegion = await AdRegion.findByIdAndDelete(id);

        if (!deletedRegion) {
            return res.status(404).json({ message: "Region not found" });
        }

        res.status(200).json({ message: "Region deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
