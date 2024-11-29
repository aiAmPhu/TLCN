import mongoose from "mongoose";

const admissionScoreSchema = new mongoose.Schema({
    majorGroup: { type: [String], required: false },
    cutoffGroup: { type: [String], required: false },
});

const AdmissionScore = mongoose.model("Admissionscore", admissionScoreSchema);

export default AdmissionScore;
