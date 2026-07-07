import { Router } from "express";
import { 
    deleteGadget, 
    getAllGadgets, 
    getGadgetByID, 
    saveGadget, 
    updateGadget 
} from "../controller/gadgetController";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { UserRole } from "../models/userModel";

const router = Router();

router.get("/all", getAllGadgets);
router.get("/:id", getGadgetByID); 
router.post("/save", authenticate, requireRole([UserRole.ADMIN]), saveGadget);
router.delete("/:id", authenticate, requireRole([UserRole.ADMIN]), deleteGadget);
router.put("/:id", authenticate, requireRole([UserRole.ADMIN]), updateGadget);

export default router;