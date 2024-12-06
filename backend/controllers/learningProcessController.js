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
            status: "waiting",
            feedback: "",
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
        updatedData.status = "waiting";
        updatedData.feedback = "";
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
export const acceptLearningProcess = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        let updatedData = req.body; // Dữ liệu mới từ body request

        // Kiểm tra nếu `status` là `rejected`, đổi thành `waiting`
        updatedData.status = "accepted";
        updatedData.feedback = "";
        // Cập nhật tài liệu theo id
        const updatedAdInfomation = await LearningProcess.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true } // Trả về tài liệu đã cập nhật và kiểm tra tính hợp lệ
        );

        if (!updatedAdInfomation) {
            return res.status(404).json({ message: "AdInfomation not found" });
        }

        res.status(200).json({ message: "Updated successfully", data: updatedAdInfomation });
    } catch (error) {
        console.error("Error updating admission infomation:", error);
        res.status(500).json({ message: error.message });
    }
};
export const rejectLearningProcess = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        let updatedData = req.body; // Dữ liệu mới từ body request

        // Kiểm tra nếu `status` là `rejected`, đổi thành `waiting`
        updatedData.status = "rejected"; // Cập nhật tài liệu theo id
        updatedData.feedback = updatedData.rejectionReason;
        console.log(updatedData);
        const updatedAdInfomation = await LearningProcess.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true } // Trả về tài liệu đã cập nhật và kiểm tra tính hợp lệ
        );

        if (!updatedAdInfomation) {
            return res.status(404).json({ message: "AdInfomation not found" });
        }

        res.status(200).json({ message: "Updated successfully", data: updatedAdInfomation });
    } catch (error) {
        console.error("Error updating admission infomation:", error);
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
export const getPriorityGroupStatusByEmail = async (req, res) => {
    try {
        const { email } = req.params; // Lấy email từ tham số URL

        // Tìm kiếm tài liệu theo email và chỉ lấy trường 'status'
        const learningprocessStatus = await LearningProcess.find({ email }).select("priorityGroup");

        // Kiểm tra nếu không có dữ liệu
        if (!learningprocessStatus.length) {
            return res.status(404).json({ message: `No learning process found for email: ${email}` });
        }

        // Trả về dữ liệu status của học bạ tương ứng với email
        res.status(200).json({ message: "Success", data: learningprocessStatus });
    } catch (error) {
        console.error("Error fetching learning process status by email:", error);
        res.status(500).json({ message: error.message });
    }
};
export const getLearningProcessStatusByEmail = async (req, res) => {
    try {
        const { email } = req.params; // Lấy email từ tham số URL

        // Tìm kiếm tài liệu theo email và chỉ lấy trường 'status'
        const learningprocessStatus = await LearningProcess.find({ email }).select("status feedback");

        // Kiểm tra nếu không có dữ liệu
        if (!learningprocessStatus.length) {
            return res.status(404).json({ message: `No learning process found for email: ${email}` });
        }

        // Trả về dữ liệu status của học bạ tương ứng với email
        res.status(200).json({ message: "Success", data: learningprocessStatus });
    } catch (error) {
        console.error("Error fetching learning process status by email:", error);
        res.status(500).json({ message: error.message });
    }
};
export const getLearningProcessByEmail = async (req, res) => {
    try {
        const { email } = req.params; // Lấy email từ URL

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Tìm tài liệu trong cơ sở dữ liệu dựa trên email
        const learningprocess = await LearningProcess.findOne({ email });

        if (!learningprocess) {
            return res.status(404).json({ message: `No transcript found for email: ${email}` });
        }

        // Trả về dữ liệu tìm được
        res.status(200).json({ message: "Success", data: learningprocess });
    } catch (error) {
        console.error("Error fetching transcript by email:", error);
        res.status(500).json({ message: error.message });
    }
};
