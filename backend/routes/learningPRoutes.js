import express from "express";
import {
    addLearningProcess,
    getAllLearningProcess,
    updateLearningProcess,
    getLearningProcessStatusByEmail,
    getLearningProcessByEmail,
    acceptLearningProcess,
    rejectLearningProcess,
} from "../controllers/learningProcessController.js";

const router = express.Router();

router.post("/add", addLearningProcess);
router.put("/update/:id", updateLearningProcess);
router.put("/accept/:id", acceptLearningProcess);
router.put("/reject/:id", rejectLearningProcess);
router.get("/getall", getAllLearningProcess);
router.get("/getStatus/:email", getLearningProcessStatusByEmail);
router.get("/getLPByE/:email", getLearningProcessByEmail);
export default router;
