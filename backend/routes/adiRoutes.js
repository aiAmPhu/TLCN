import express from "express";
import {
    addAdInfomation,
    updateAdInfomation,
    getAllAdInfomation,
    getAdmissionInformationStatusByEmail,
    getAdmissionInformationByEmail,
    acceptAdInfomation,
    rejectAdInfomation,
    getFirstAndLastNameByEmail,
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
router.get("/getFaLNameByE/:email", getFirstAndLastNameByEmail);

export default router;
