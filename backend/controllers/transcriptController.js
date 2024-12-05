import Transcript from "../models/Transcript.js";

// export const addTranscript = async (req, res) => {
//     try {
//         const { subject, scores } = req.body;

//         // Kiểm tra xem môn học đã tồn tại hay chưa
//         const existingTranscript = await Transcript.findOne({ subject });

//         if (existingTranscript) {
//             // Nếu môn học đã tồn tại
//             return res.status(400).json({ message: "Subject already exists" });
//         }

//         // Tạo mới transcript
//         const newTranscript = new Transcript({
//             subject,
//             scores, // Phải đảm bảo scores là một mảng đúng định dạng
//         });

//         // Lưu transcript vào cơ sở dữ liệu
//         await newTranscript.save();
//         res.status(201).json({ message: "Transcript created successfully" });
//     } catch (error) {
//         console.error("Error:", error); // Log chi tiết lỗi
//         res.status(500).json({ message: error.message });
//     }
// };
export const addTranscript = async (req, res) => {
    try {
        const subjects = req.body; // Dữ liệu trực tiếp là danh sách môn học

        // Kiểm tra dữ liệu đầu vào
        if (!Array.isArray(subjects) || subjects.length === 0) {
            return res.status(400).json({ message: "Invalid input data: List of subjects is required" });
        }

        // Tạo bản ghi Transcript mới
        const newTranscript = new Transcript({ subjects });

        // Lưu vào cơ sở dữ liệu
        await newTranscript.save();

        res.status(201).json({ message: "Transcript created successfully", data: newTranscript });
    } catch (error) {
        console.error("Error adding transcript:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
