import express from "express";
import { addAdYear, deleteAdYear, getAllAdYears, updateAdYear } from "../controllers/adyController.js";

const router = express.Router();

router.post("/add", addAdYear);
router.get("/getall", getAllAdYears);
router.put("/update/:id", updateAdYear);
router.delete("/delete/:id", deleteAdYear);
export default router;
