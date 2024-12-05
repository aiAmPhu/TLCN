import express from "express";
import { addPhotoID, updatePhotoID, getAllPhotos } from "../controllers/photoIDController.js";

const router = express.Router();

router.post("/add", addPhotoID);
router.put("/update/:id", updatePhotoID);
router.get("/getall", getAllPhotos);
export default router;
