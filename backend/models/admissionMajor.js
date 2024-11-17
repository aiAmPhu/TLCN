import mongoose from "mongoose";

const adMSchema = new mongoose.Schema({
    majorId: { type: String, required: true },
    majorCodeName: { type: String, required: true },
    majorName: { type: String, required: true },
    majorCombination: { type: [String], required: true },
    majorDescription: { type: String, default: null },
});

const adMajor = mongoose.model("admissionmajor", adMSchema);

export default adMajor;
