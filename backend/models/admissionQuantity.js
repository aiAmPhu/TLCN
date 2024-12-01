import mongoose from "mongoose";

const admissionQuantitySchema = new mongoose.Schema({
    majorId: { type: String, required: true },
    criteriaId: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const AdQuantity = mongoose.model("admissionquantity", admissionQuantitySchema);

export default AdQuantity;
