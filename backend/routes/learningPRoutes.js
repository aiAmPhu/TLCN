import express from "express";
import {
    addLearningProcess,
    getAllLearningProcess,
    updateLearningProcess,
} from "../controllers/learningProcessController.js";

const router = express.Router();

router.post("/add", addLearningProcess);
router.put("/update/:id", updateLearningProcess);
router.get("/getall", getAllLearningProcess);
export default router;
