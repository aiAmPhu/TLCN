import LearningProcess from "../models/learningProcess.js"; // Giả sử đây là đường dẫn model của bạn

export const addLearningProcess = async (req, res) => {
    try {
        //console.log("Received Request Body:", req.body);
        const {
            grade10, // grade10 object chứa province, district, school
            grade11, // grade11 object chứa province, district, school
            grade12, // grade12 object chứa province, district, school
            graduationYear, // graduation year
            priorityGroup, // priority group
            email,
        } = req.body;

        // Tạo tài liệu mới
        const newLearningProcess = new LearningProcess({
            grade10,
            grade11,
            grade12,
            graduationYear,
            priorityGroup,
            email,
            status: "waiting", // default status nếu không có
        });

        // Lưu vào cơ sở dữ liệu
        await newLearningProcess.save();

        res.status(201).json({
            message: "Admission information added successfully",
            data: newLearningProcess,
        });
    } catch (error) {
        console.error("Error adding admission information:", error);
        res.status(500).json({ message: error.message });
    }
};
export const updateLearningProcess = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        let updatedData = req.body; // Dữ liệu mới từ body request

        // Kiểm tra nếu `status` là `rejected`, đổi thành `waiting`
        if (updatedData.status === "rejected") {
            updatedData.status = "waiting";
        }
        // Cập nhật tài liệu theo id
        const updatedLearningProcess = await LearningProcess.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true } // Trả về tài liệu đã cập nhật và kiểm tra tính hợp lệ
        );

        if (!updatedLearningProcess) {
            return res.status(404).json({ message: "Learning process not found" });
        }

        res.status(200).json({ message: "Updated successfully", data: updatedLearningProcess });
    } catch (error) {
        console.error("Error updating learning process:", error);
        res.status(500).json({ message: error.message });
    }
};
export const getAllLearningProcess = async (req, res) => {
    try {
        // Lấy tất cả tài liệu từ collection
        const learningprocess = await LearningProcess.find();

        // Kiểm tra nếu không có dữ liệu
        if (!learningprocess.length) {
            return res.status(404).json({ message: "No learning process found" });
        }

        // Trả về dữ liệu
        res.status(200).json({ message: "Success", data: learningprocess });
    } catch (error) {
        console.error("Error fetching learning process:", error);
        res.status(500).json({ message: error.message });
    }
};
