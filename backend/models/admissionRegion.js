import mongoose from "mongoose";

const admissionRegionSchema = new mongoose.Schema({
    regionId: { type: String, required: true },
    regionName: { type: String, required: true },
    regionScored: { type: Number, required: true },
});

const AdRegion = mongoose.model("admissionregion", admissionRegionSchema);

export default AdRegion;
