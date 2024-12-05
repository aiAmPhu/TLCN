import Transcript from '../models/Transcript.js';

export const saveTranscript = async (req, res) => {
  try {
    const transcript = await Transcript.create(req.body);
    res.status(201).json(transcript);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
