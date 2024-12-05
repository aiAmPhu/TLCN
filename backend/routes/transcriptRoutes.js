import express from 'express';
import { saveTranscript } from '../controllers/transcriptController.js';

const router = express.Router();

router.post('/transcripts', saveTranscript);

export default router;
