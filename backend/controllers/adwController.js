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
export const getAllWishWithEmail = async (req, res) => {
    try {
        const { email } = req.params; // Lấy email từ tham số URL

        // Tìm tất cả các Admission Wish có email tương ứng
        const admissionWishes = await AdmissionWish.find({ email });

        if (admissionWishes.length === 0) {
            return res.status(400).json({ message: "No admission wishes found for this email" });
        }

        // Trả về tất cả các Admission Wishes của email
        res.status(200).json({ message: "All admission wishes found", data: admissionWishes });
    } catch (error) {
        console.error("Error finding admission wishes:", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};
export const getAllUniqueEmails = async (req, res) => {
    try {
        // Sử dụng phương thức distinct để lấy tất cả các email khác nhau
        const emails = await AdmissionWish.distinct("email");

        if (emails.length === 0) {
            return res.status(400).json({ message: "No emails found" });
        }

        // Trả về danh sách các email duy nhất
        res.status(200).json({ message: "All unique emails found", data: emails });
    } catch (error) {
        console.error("Error fetching unique emails:", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};
export const getByStatus = async (req, res) => {
    try {
        // const { status } = req.params; // Lấy status từ tham số URL

        // Tìm tất cả các Admission Wish với status tương ứng và chỉ lấy các trường cần thiết
        const admissionWishes = await AdmissionWish.find().select("priority criteriaId major scores email"); //{ status }

        if (admissionWishes.length === 0) {
            return res.status(404).json({ message: `No admission wishes found with status:` });
        }

        // Trả về danh sách Admission Wishes với các trường cụ thể
        res.status(200).json({ message: `Admission wishes with status: `, data: admissionWishes });
    } catch (error) {
        console.error("Error finding admission wishes by status:", error); // Log chi tiết lỗi
        res.status(500).json({ message: error.message });
    }
};
export const acceptWish = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        let updatedData = req.body; // Dữ liệu mới từ body request

        // Kiểm tra nếu `status` là `rejected`, đổi thành `waiting`
        updatedData.status = "accepted";
        // Cập nhật tài liệu theo id
        const updatedAdInfomation = await AdmissionWish.findByIdAndUpdate(
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
export const rejectWish = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        let updatedData = req.body; // Dữ liệu mới từ body request

        // Kiểm tra nếu `status` là `rejected`, đổi thành `waiting`
        updatedData.status = "rejected"; // Cập nhật tài liệu theo id
        const updatedAdInfomation = await AdmissionWish.findByIdAndUpdate(
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
export const waitingtWish = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL
        let updatedData = req.body; // Dữ liệu mới từ body request

        // Kiểm tra nếu `status` là `rejected`, đổi thành `waiting`
        updatedData.status = "waiting"; // Cập nhật tài liệu theo id
        const updatedAdInfomation = await AdmissionWish.findByIdAndUpdate(
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
