import express from "express";
import {
    addUser,
    getAllUsers,
    updateUser,
    deleteUser,
    sendOTP,
    verifyEmail,
    addUserNoOTP,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/add", addUser);
router.post("/addNoOTP", addUserNoOTP);
router.get("/getall", getAllUsers);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/sendOTP", sendOTP);
router.post("/verify", verifyEmail);
export default router;
