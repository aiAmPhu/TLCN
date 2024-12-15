import AdInfomation from "../models/admissionInfomation.js"; // Đổi tên model thành AdCriteria

// Thêm Criteria mới
export const addAdInfomation = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            birthDate,
            gender,
            birthPlace,
            phone,
            email,
            parentEmail,
            idNumber,
            idIssueDate,
            idIssuePlace,
            province,
            district,
            commune,
            address,
            houseNumber,
            streetName,
        } = req.body;

        // Tạo tài liệu mới
        const newAdInformation = new AdInfomation({
            firstName,
            lastName,
            birthDate,
            gender,
            birthPlace,
            phone,
            email,
            parentEmail,
            idNumber,
            idIssueDate,
            idIssuePlace,
            province,
            district,
            commune,
            address,
            houseNumber,
            streetName,
            status: "waiting",
            feedback: "",
        });

        // Lưu vào cơ sở dữ liệu
        await newAdInformation.save();

        res.status(201).json({ message: "Admission infomation added successfully", data: newAdInformation });
    } catch (error) {
        console.error("Error adding admission infomation:", error);
        res.status(500).json({ message: error.message });
    }
};
export const updateAdInfomation = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        let updatedData = req.body; // Dữ liệu mới từ body request

        // Kiểm tra nếu `status` là `rejected`, đổi thành `waiting`
        updatedData.status = "waiting";
        updatedData.feedback = "";
        // Cập nhật tài liệu theo id
        const updatedAdInfomation = await AdInfomation.findByIdAndUpdate(
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
export const acceptAdInfomation = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        let updatedData = req.body; // Dữ liệu mới từ body request

        // Kiểm tra nếu `status` là `rejected`, đổi thành `waiting`
        updatedData.status = "accepted";
        updatedData.feedback = "";
        // Cập nhật tài liệu theo id
        const updatedAdInfomation = await AdInfomation.findByIdAndUpdate(
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
export const rejectAdInfomation = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        let updatedData = req.body; // Dữ liệu mới từ body request

        // Kiểm tra nếu `status` là `rejected`, đổi thành `waiting`
        updatedData.status = "rejected"; // Cập nhật tài liệu theo id
        updatedData.feedback = updatedData.rejectionReason;
        console.log(updatedData);
        const updatedAdInfomation = await AdInfomation.findByIdAndUpdate(
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
export const getAllAdInfomation = async (req, res) => {
    try {
        // Lấy tất cả tài liệu từ collection
        const adInformations = await AdInfomation.find();

        // Kiểm tra nếu không có dữ liệu
        if (!adInformations.length) {
            return res.status(404).json({ message: "No admission information found" });
        }

        // Trả về dữ liệu
        res.status(200).json({ message: "Success", data: adInformations });
    } catch (error) {
        console.error("Error fetching admission information:", error);
        res.status(500).json({ message: error.message });
    }
};
export const getAdmissionInformationStatusByEmail = async (req, res) => {
    try {
        const { email } = req.params; // Lấy email từ tham số URL

        // Tìm kiếm tài liệu theo email và chỉ lấy trường 'status'
        const adInfomation = await AdInfomation.find({ email }).select("status feedback");

        // Kiểm tra nếu không có dữ liệu
        if (!adInfomation.length) {
            return res.status(404).json({ message: `No learning process found for email: ${email}` });
        }

        // Trả về dữ liệu status của học bạ tương ứng với email
        res.status(200).json({ message: "Success", data: adInfomation });
    } catch (error) {
        console.error("Error fetching learning process status by email:", error);
        res.status(500).json({ message: error.message });
    }
};
export const getAdmissionInformationByEmail = async (req, res) => {
    try {
        const { email } = req.params; // Lấy email từ URL

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Tìm tài liệu trong cơ sở dữ liệu dựa trên email
        const adInfomation = await AdInfomation.findOne({ email });

        if (!adInfomation) {
            return res.status(404).json({ message: `No transcript found for email: ${email}` });
        }

        // Trả về dữ liệu tìm được
        res.status(200).json({ message: "Success", data: adInfomation });
    } catch (error) {
        console.error("Error fetching transcript by email:", error);
        res.status(500).json({ message: error.message });
    }
};
export const getFirstAndLastNameByEmail = async (req, res) => {
    try {
        const { email } = req.params; // Lấy email từ tham số URL

        // Tìm thông tin đầu tiên khớp với email và chỉ chọn các trường firstName và lastName
        const adInformation = await AdInfomation.findOne({ email }).select("firstName lastName");

        // Kiểm tra nếu không tìm thấy thông tin
        if (!adInformation) {
            return res.status(404).json({ message: `No admission information found for email: ${email}` });
        }

        // Trả về thông tin firstName và lastName
        res.status(200).json({
            message: "Success",
            data: {
                firstName: adInformation.firstName,
                lastName: adInformation.lastName,
            },
        });
    } catch (error) {
        console.error("Error fetching firstName and lastName by email:", error);
        res.status(500).json({ message: error.message });
    }
};
