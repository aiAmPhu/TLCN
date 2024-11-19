import mongoose from "mongoose";

const userPermissionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    majorGroup: { type: [String], required: true },
});

const UserP = mongoose.model("UserPermissions", userPermissionSchema);

export default UserP;
