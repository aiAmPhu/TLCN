import express from "express";
import { addAdBlock, getAllAdBlocks, updateAdBlock, deleteAdBlock } from "../controllers/adbController.js";

const router = express.Router();

router.post("/add", addAdBlock);
router.get("/getall", getAllAdBlocks);
router.put("/update/:id", updateAdBlock);
router.delete("/delete/:id", deleteAdBlock);
export default router;
