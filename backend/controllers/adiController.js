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
        if (updatedData.status === "rejected") {
            updatedData.status = "waiting";
        }
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
