import express from "express";
import {
    addAdInfomation,
    updateAdInfomation,
    getAllAdInfomation,
    getAdmissionInformationStatusByEmail,
    getAdmissionInformationByEmail,
    acceptAdInfomation,
    rejectAdInfomation,
} from "../controllers/adiController.js";

const router = express.Router();

router.post("/add", addAdInfomation);
router.put("/update/:id", updateAdInfomation);
router.put("/accept/:id", acceptAdInfomation);
router.put("/reject/:id", rejectAdInfomation);
router.put("/update/:id", updateAdInfomation);
router.get("/getall", getAllAdInfomation);
router.get("/getStatus/:email", getAdmissionInformationStatusByEmail);
router.get("/getAdiByE/:email", getAdmissionInformationByEmail);
export default router;
