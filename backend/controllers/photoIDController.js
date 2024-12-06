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
            feedback: "",
        });
        await newPhotoID.save();
        res.status(201).json({ message: "Photo ID added successfully", data: newPhotoID });
    } catch (error) {
        console.error("Error adding admission infomation:", error);
        res.status(500).json({ message: error.message });
    }
};
export const acceptPhotoID = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        let updatedData = req.body; // Dữ liệu mới từ body request

        // Kiểm tra nếu `status` là `rejected`, đổi thành `waiting`
        updatedData.status = "accepted";
        updatedData.feedback = "";
        // Cập nhật tài liệu theo id
        const updatedAdInfomation = await PhotoID.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true } // Trả về tài liệu đã cập nhật và kiểm tra tính hợp lệ
        );

        if (!updatedAdInfomation) {
            return res.status(400).json({ message: "AdInfomation not found" });
        }

        res.status(200).json({ message: "Updated successfully", data: updatedAdInfomation });
    } catch (error) {
        console.error("Error updating admission infomation:", error);
        res.status(500).json({ message: error.message });
    }
};
export const rejectPhotoID = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        let updatedData = req.body; // Dữ liệu mới từ body request

        // Kiểm tra nếu `status` là `rejected`, đổi thành `waiting`
        updatedData.status = "rejected"; // Cập nhật tài liệu theo id
        updatedData.feedback = updatedData.rejectionReason;
        console.log(updatedData);
        const updatedAdInfomation = await PhotoID.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true } // Trả về tài liệu đã cập nhật và kiểm tra tính hợp lệ
        );

        if (!updatedAdInfomation) {
            return res.status(400).json({ message: "AdInfomation not found" });
        }

        res.status(200).json({ message: "Updated successfully", data: updatedAdInfomation });
    } catch (error) {
        console.error("Error updating admission infomation:", error);
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
export const getPhotoStatusByEmail = async (req, res) => {
    try {
        const { email } = req.params; // Lấy email từ tham số URL

        // Tìm kiếm tài liệu theo email và chỉ lấy trường 'status'
        const photoStatus = await PhotoID.find({ email }).select("status feedback");

        // Kiểm tra nếu không có dữ liệu
        if (!photoStatus.length) {
            return res.status(404).json({ message: `No learning process found for email: ${email}` });
        }

        // Trả về dữ liệu status của học bạ tương ứng với email
        res.status(200).json({ message: "Success", data: photoStatus });
    } catch (error) {
        console.error("Error fetching learning process status by email:", error);
        res.status(500).json({ message: error.message });
    }
};
export const getPhotoByEmail = async (req, res) => {
    try {
        const { email } = req.params; // Lấy email từ URL

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Tìm tài liệu trong cơ sở dữ liệu dựa trên email
        const photo = await PhotoID.findOne({ email });

        if (!photo) {
            return res.status(404).json({ message: `No transcript found for email: ${email}` });
        }

        // Trả về dữ liệu tìm được
        res.status(200).json({ message: "Success", data: photo });
    } catch (error) {
        console.error("Error fetching transcript by email:", error);
        res.status(500).json({ message: error.message });
    }
};
