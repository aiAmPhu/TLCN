import AdObject from "../models/admissionObject.js"; // Đổi tên model thành AdObject

// Thêm Object mới
export const addAdObject = async (req, res) => {
    try {
        const { objectId, objectName, objectScored, objectDescription } = req.body;

        // Kiểm tra xem Object ID đã tồn tại chưa
        const existingObject = await AdObject.findOne({ objectId });

        if (existingObject) {
            // Nếu Object ID đã tồn tại
            return res.status(400).json({ message: "Object ID already exists" });
        }

        // Tạo mới Object
        const newObject = new AdObject({
            objectId,
            objectName,
            objectScored,
            objectDescription,
        });

        await newObject.save();
        res.status(201).json({ message: "Object created successfully" });
    } catch (error) {
        console.error("Error adding object:", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};

// Lấy toàn bộ Objects
export const getAllAdObjects = async (req, res) => {
    try {
        const objects = await AdObject.find();
        res.status(200).json(objects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getScoreByID = async (req, res) => {
    try {
        const { objectId } = req.params; // Lấy ID từ tham số URL (id sẽ được truyền từ client)

        // Tìm đối tượng theo ID
        const adObject = await AdObject.findOne({ objectId }); // Tìm đối tượng trong cơ sở dữ liệu

        if (!adObject) {
            return res.status(404).json({ message: "Ad Object not found" }); // Nếu không tìm thấy đối tượng
        }

        // Trả về điểm của đối tượng tìm được
        res.status(200).json({ score: adObject.objectScored }); // Giả sử `score` là trường lưu trữ điểm của đối tượng
    } catch (error) {
        console.error("Error fetching score:", error); // Log lỗi chi tiết
        res.status(500).json({ message: error.message }); // Trả về lỗi nếu có
    }
};
// Cập nhật Object
export const updateAdObject = async (req, res) => {
    try {
        const { id } = req.params;
        const { objectId, objectName, objectScored, objectDescription } = req.body;

        // Kiểm tra xem Object ID có trùng với ID của một Object khác không
        const existingObject = await AdObject.findOne({ objectId });

        if (existingObject && existingObject._id.toString() !== id) {
            // Nếu Object ID đã tồn tại và không phải là của Object hiện tại
            return res.status(400).json({ message: "Object ID already exists" });
        }

        // Cập nhật thông tin Object
        const updatedObject = await AdObject.findByIdAndUpdate(
            id,
            {
                objectId,
                objectName,
                objectScored,
                objectDescription,
            },
            { new: true, runValidators: true }
        );

        if (!updatedObject) {
            return res.status(404).json({ message: "Object not found" });
        }

        res.status(200).json({ message: "Object updated successfully", updatedObject });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa Object
export const deleteAdObject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedObject = await AdObject.findByIdAndDelete(id);

        if (!deletedObject) {
            return res.status(404).json({ message: "Object not found" });
        }

        res.status(200).json({ message: "Object deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
