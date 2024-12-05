import mongoose from "mongoose";
const transcriptSchema = new mongoose.Schema({
    subjects: [
        {
            subject: { type: String, required: true },
            averageScore: { type: String, required: true },
            scores: [
                {
                    year: { type: String, required: true },
                    semester: { type: String, required: true },
                    score: { type: Number, min: 0, max: 10, required: true },
                },
            ],
        },
    ],
    email: { type: String, required: true },
    status: { type: String, required: true },
});

const Transcript = mongoose.model("Transcript", transcriptSchema);
export default Transcript;
