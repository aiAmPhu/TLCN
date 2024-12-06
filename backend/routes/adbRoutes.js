import express from "express";
import {
    addAdBlock,
    getAllAdBlocks,
    updateAdBlock,
    deleteAdBlock,
    getAllSubjectsByAdmissionBlockId,
} from "../controllers/adbController.js";

const router = express.Router();

router.post("/add", addAdBlock);
router.get("/getall", getAllAdBlocks);
router.get("/getSubjects/:admissionBlockId", getAllSubjectsByAdmissionBlockId);
router.put("/update/:id", updateAdBlock);
router.delete("/delete/:id", deleteAdBlock);
export default router;
