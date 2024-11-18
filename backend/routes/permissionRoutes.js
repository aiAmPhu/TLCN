import express from "express";
import { updatePermission, deletePermission } from "../controllers/permissionController.js";

const router = express.Router();

// router.post("/add", addAdMajor);
// router.get("/getall", getAllAdMajors);
router.put("/update/:id", updatePermission);
router.delete("/delete/:id", deletePermission);
export default router;
