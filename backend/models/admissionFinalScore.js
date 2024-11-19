import mongoose from "mongoose";

const admissionFinalScoreSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    category: [
        {
            preference: [String], // the first index is preference, the second, third, ... index is scores
        },
    ],
});

const AFScore = mongoose.model("admissionfinalscore", admissionFinalScoreSchema);
export default AFScore;
