import PhotoID from "../models/photoID.js";
export const addPhotoID = async (req, res) => {
    try {
        const { personalPic, frontCCCD, backCCCD, grade10Pic, grade11Pic, grade12Pic, email } = req.body;

        // Tạo tài liệu mới
        const newPhotoID = new PhotoID({
            personalPic,
            frontCCCD,
            backCCCD,
            grade10Pic,
            grade11Pic,
            grade12Pic,
            email,
            status: "waiting",
        });
        await newPhotoID.save();
        res.status(201).json({ message: "Photo ID added successfully", data: newPhotoID });
    } catch (error) {
        console.error("Error adding admission infomation:", error);
        res.status(500).json({ message: error.message });
    }
};
export const updatePhotoID = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        let updatedData = req.body; // Dữ liệu mới từ body request
        if (updatedData.status === "rejected") {
            updatedData.status = "waiting";
        }
        const updatedPhotoID = await PhotoID.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true } // Trả về tài liệu đã cập nhật và kiểm tra tính hợp lệ
        );
        if (!updatedPhotoID) {
            return res.status(404).json({ message: "Learning process not found" });
        }
        res.status(200).json({ message: "Updated successfully", data: updatedPhotoID });
    } catch (error) {
        console.error("Error updating photo:", error);
        res.status(500).json({ message: error.message });
    }
};
export const getAllPhotos = async (req, res) => {
    try {
        const photoID = await PhotoID.find();
        if (!photoID.length) {
            return res.status(404).json({ message: "No learning process found" });
        }
        res.status(200).json({ message: "Success", data: photoID });
    } catch (error) {
        console.error("Error fetching photos:", error);
        res.status(500).json({ message: error.message });
    }
};
