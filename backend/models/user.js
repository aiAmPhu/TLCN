import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    pic: { type: String, required: true },
    majorGroup: { type: [String], required: false },
    transcriptGroup: { type: [String], required: false },
});

const User = mongoose.model("User", userSchema);

export default User;
