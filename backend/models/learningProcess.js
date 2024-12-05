import mongoose from "mongoose";

// Định nghĩa schema cho dữ liệu của bạn
const learningprocessSchema = new mongoose.Schema({
    grade10: {
        province: { type: String, required: true },
        district: { type: String, required: true },
        school: { type: String, required: true },
    },
    grade11: {
        province: { type: String, required: true },
        district: { type: String, required: true },
        school: { type: String, required: true },
    },
    grade12: {
        province: { type: String, required: true },
        district: { type: String, required: true },
        school: { type: String, required: true },
    },
    graduationYear: { type: String, required: true },
    priorityGroup: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true },
    feedback: { type: String, required: false },
});

// Tạo model từ schema
const learningprocess = mongoose.model("learningprocess", learningprocessSchema);

export default learningprocess;
