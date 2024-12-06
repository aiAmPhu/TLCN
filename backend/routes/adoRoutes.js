import express from "express";
import {
    addAdObject,
    deleteAdObject,
    getAllAdObjects,
    updateAdObject,
    getScoreByID,
} from "../controllers/adoController.js";

const router = express.Router();

router.post("/add", addAdObject);
router.get("/getall", getAllAdObjects);
router.get("/getScoreByID/:objectId", getScoreByID);
router.put("/update/:id", updateAdObject);
router.delete("/delete/:id", deleteAdObject);
export default router;
