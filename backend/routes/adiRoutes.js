import express from "express";
import { addAdInfomation } from "../controllers/adiController.js";

const router = express.Router();

router.post("/add", addAdInfomation);

export default router;
