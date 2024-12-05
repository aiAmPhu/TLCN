import express from "express";
import { addTranscript, getAllTranscripts, updateTranscript } from "../controllers/transcriptController.js";

const router = express.Router();

router.post("/add", addTranscript);
router.get("/getAll", getAllTranscripts);
router.put("/update", updateTranscript);
export default router;
