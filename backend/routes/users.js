import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/:id", authenticate, getProfile);
router.put("/:id", authenticate, updateProfile);

export default router;