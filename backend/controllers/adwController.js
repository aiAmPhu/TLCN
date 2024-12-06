import AdmissionWish from "../models/admissionWishes.js"; // Đảm bảo bạn import đúng model

export const addAdmissionWish = async (req, res) => {
    try {
        const { priority, criteriaId, admissionBlockId, email, scores, major } = req.body;

        const newAdmissionWish = new AdmissionWish({
            priority,
            criteriaId,
            admissionBlockId,
            major,
            email,
            scores, // Sử dụng đối tượng scores đã được gửi từ client
            status: "waiting",
        });

        // Lưu Admission Wish vào database
        await newAdmissionWish.save();
        res.status(201).json({ message: "Admission Wish created successfully", data: newAdmissionWish });
    } catch (error) {
        console.error("Error adding admission wish:", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};
export const getHighestPriorityAdmissionWish = async (req, res) => {
    try {
        const { email } = req.params; // Lấy email từ tham số URL

        // Tìm tất cả các Admission Wish có email tương ứng và sắp xếp theo priority giảm dần
        const admissionWishes = await AdmissionWish.find({ email })
            .sort({ priority: -1 }) // Sắp xếp theo priority, -1 là giảm dần
            .limit(1); // Giới hạn chỉ lấy 1 bản ghi có priority cao nhất

        if (!admissionWishes.length) {
            return res.status(400).json({ message: "No admission wish found for this email" });
        }

        // Trả về Admission Wish có priority cao nhất
        res.status(200).json({ message: "Highest priority admission wish found", data: admissionWishes[0] });
    } catch (error) {
        console.error("Error finding highest priority admission wish:", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};
