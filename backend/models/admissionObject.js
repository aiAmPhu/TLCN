import mongoose from "mongoose";

const admissionObjectSchema = new mongoose.Schema({
    objectId: { type: String, required: true },
    objectName: { type: String, required: true },
    objectScored: { type: Number, required: true },
    objectDescription: { type: String, required: true },
});

const AdObject = mongoose.model("admissionobject", admissionObjectSchema);

export default AdObject;
