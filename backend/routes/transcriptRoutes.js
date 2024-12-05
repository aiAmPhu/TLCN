import express from "express";
import { addTranscript } from "../controllers/transcriptController.js";

const router = express.Router();

router.post("/add", addTranscript);

export default router;
