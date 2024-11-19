import mongoose from "mongoose";

const admissionYearSchema = new mongoose.Schema({
    yearId: { type: String, required: true },
    yearName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    yearMajors: { type: [String], required: true },
});

const AdYear = mongoose.model("admissionyear", admissionYearSchema);

export default AdYear;
