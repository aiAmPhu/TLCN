import express from "express";
import {
    addTranscript,
    getAllTranscripts,
    updateTranscript,
    getTranscriptStatusByEmail,
    getTranscriptByEmail,
    acceptTranscript,
    rejectTranscript,
} from "../controllers/transcriptController.js";

const router = express.Router();

router.post("/add", addTranscript);
router.get("/getAll", getAllTranscripts);
router.put("/accept/:id", acceptTranscript);
router.put("/reject/:id", rejectTranscript);
router.put("/update", updateTranscript);
router.get("/getStatus/:email", getTranscriptStatusByEmail);
router.get("/getTranscriptByE/:email", getTranscriptByEmail);
export default router;
