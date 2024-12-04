import express from "express";
import { addAdInfomation, updateAdInfomation, getAllAdInfomation } from "../controllers/adiController.js";

const router = express.Router();

router.post("/add", addAdInfomation);
router.put("/update/:id", updateAdInfomation);
router.get("/getall", getAllAdInfomation);
export default router;
