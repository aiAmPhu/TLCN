import express from "express";
import {
    addAdQuantity,
    getAllAdQuantities,
    updateAdQuantity,
    deleteAdQuantity,
    getQuantityByCriteriaIdAndMajorId,
} from "../controllers/adqController.js";

const router = express.Router();

router.post("/add", addAdQuantity);
router.get("/getall", getAllAdQuantities);
router.put("/update/:id", updateAdQuantity);
router.delete("/delete/:id", deleteAdQuantity);
router.get("/getQuantityByCriteriaIdAndMajorId/:criteriaId/:majorId", getQuantityByCriteriaIdAndMajorId);

export default router;
