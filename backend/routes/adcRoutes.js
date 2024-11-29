import express from "express";
import { addAdCriteria, getAllAdCriterias, updateAdCriteria, deleteAdCriteria } from "../controllers/adcController.js";

const router = express.Router();

router.post("/add", addAdCriteria);
router.get("/getall", getAllAdCriterias);
router.put("/update/:id", updateAdCriteria);
router.delete("/delete/:id", deleteAdCriteria);
export default router;
