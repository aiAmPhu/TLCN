import mongoose from "mongoose";

const adCSchema = new mongoose.Schema({
    criteriaId: { type: String, required: true },
    criteriaName: { type: String, required: true },
    criteriaDescription: { type: String, required: true },
});

const adCriteria = mongoose.model("admissionCriteria", adCSchema);

export default adCriteria;
