import mongoose from "mongoose";

const adBSchema = new mongoose.Schema({
    admissionBlockId: { type: String, required: true },
    admissionBlockName: { type: String, required: true },
    admissionBlockSubject1: { type: String, required: true },
    admissionBlockSubject2: { type: String, required: true },
    admissionBlockSubject3: { type: String, required: true },
});

const adBlock = mongoose.model("admissionblock", adBSchema);

export default adBlock;
