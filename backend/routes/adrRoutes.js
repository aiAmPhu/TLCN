import express from "express";
import { addAdRegion, deleteAdRegion, getAllAdRegions, updateAdRegion } from "../controllers/adrController.js";

const router = express.Router();

router.post("/add", addAdRegion);
router.get("/getall", getAllAdRegions);
router.put("/update/:id", updateAdRegion);
router.delete("/delete/:id", deleteAdRegion);
export default router;
