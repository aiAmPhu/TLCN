import express from "express";
import {
    addAdmissionWish,
    getHighestPriorityAdmissionWish,
    getAllWishWithEmail,
    getAllUniqueEmails,
    getByStatus,
    acceptWish,
    rejectWish,
    waitingtWish,
    getAcceptedWish,
} from "../controllers/adwController.js";

const router = express.Router();

router.post("/add", addAdmissionWish);
router.get("/max/:email", getHighestPriorityAdmissionWish);
router.get("/getAll/:email", getAllWishWithEmail);
router.get("/getUniqueEmails", getAllUniqueEmails);
router.get("/getByStatus", getByStatus);
router.put("/accept/:id", acceptWish);
router.put("/reject/:id", rejectWish);
router.put("/waiting/:id", waitingtWish);
router.get("/getAccepted", getAcceptedWish);
// router.get("/getall", getAllAdRegions);
// router.put("/update/:id", updateAdRegion);
// router.delete("/delete/:id", deleteAdRegion);
export default router;
