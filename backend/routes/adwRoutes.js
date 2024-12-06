import express from "express";
import { addAdmissionWish, getHighestPriorityAdmissionWish } from "../controllers/adwController.js";

const router = express.Router();

router.post("/add", addAdmissionWish);
router.get("/max/:email", getHighestPriorityAdmissionWish);
// router.get("/getall", getAllAdRegions);
// router.put("/update/:id", updateAdRegion);
// router.delete("/delete/:id", deleteAdRegion);
export default router;
