import mongoose from "mongoose";

const admissionWishesSchema = new mongoose.Schema({
    priority: { type: Number, required: true },
    criteriaId: { type: String, required: true },
    admissionBlockId: { type: String, required: true },
    major: { type: String, required: true },
    email: { type: String, required: true },
    scores: { type: Number, required: true },
    status: { type: String, required: true },
});

const AdmissionWishes = mongoose.model("admissionwishes", admissionWishesSchema);

export default AdmissionWishes;
