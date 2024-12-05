import express from "express";
import {
    addPhotoID,
    updatePhotoID,
    getAllPhotos,
    getPhotoStatusByEmail,
    getPhotoByEmail,
    acceptPhotoID,
    rejectPhotoID,
} from "../controllers/photoIDController.js";

const router = express.Router();

router.post("/add", addPhotoID);
router.put("/update/:id", updatePhotoID);
router.get("/getall", getAllPhotos);
router.put("/accept/:id", acceptPhotoID);
router.put("/reject/:id", rejectPhotoID);
router.get("/getStatus/:email", getPhotoStatusByEmail);
router.get("/getPhotoByE/:email", getPhotoByEmail);
export default router;
