import express from "express";
import { addAdMajor, deleteAdMajor, getAllAdMajors, updateAdMajor } from "../controllers/admController.js";

const router = express.Router();

router.post("/add", addAdMajor);
router.get("/getall", getAllAdMajors);
router.put("/update/:id", updateAdMajor);
router.delete("/delete/:id", deleteAdMajor);
export default router;
