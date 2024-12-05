import mongoose from "mongoose";

const photoIDSchema = new mongoose.Schema({
    personalPic: { type: String, required: false },
    frontCCCD: { type: String, required: false },
    backCCCD: { type: String, required: false },
    grade10Pic: { type: String, required: false },
    grade11Pic: { type: String, required: false },
    grade12Pic: { type: String, required: false },
    email: { type: String, required: false },
    status: { type: String, required: false },
    feedback: { type: String, required: false },
});

const PhotoID = mongoose.model("photoid", photoIDSchema);
export default PhotoID;
