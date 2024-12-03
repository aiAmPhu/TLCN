import mongoose from "mongoose";

const adISchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: { type: String, required: true },
    birthPlace: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    parentEmail: { type: String, required: true },
    idNumber: { type: String, required: true },
    idIssueDate: { type: Date, required: true },
    idIssuePlace: { type: String, required: true },
    province: { type: String, required: true },
    district: { type: String, required: true },
    commune: { type: String, required: true },
    address: { type: String, required: true },
    houseNumber: { type: String, required: true },
    streetName: { type: String, required: true },
});

const adInfomation = mongoose.model("admissionInfomation", adISchema);

export default adInfomation;
