import express from "express";
import {
    addAdMajor,
    deleteAdMajor,
    getAllAdMajors,
    updateAdMajor,
    getMajorCombinationByName,
} from "../controllers/admController.js";

const router = express.Router();

router.post("/add", addAdMajor);
router.get("/getall", getAllAdMajors);
router.get("/getCombination/:majorId", getMajorCombinationByName);
router.put("/update/:id", updateAdMajor);
router.delete("/delete/:id", deleteAdMajor);
export default router;
