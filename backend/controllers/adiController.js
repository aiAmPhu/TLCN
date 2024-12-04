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

        // Kiểm tra các trường bắt buộc
        if (
            !firstName ||
            !lastName ||
            !birthDate ||
            !gender ||
            !birthPlace ||
            !phone ||
            !email ||
            !parentEmail ||
            !idNumber ||
            !idIssueDate ||
            !idIssuePlace ||
            !province ||
            !district ||
            !commune ||
            !address ||
            !houseNumber ||
            !streetName
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

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
