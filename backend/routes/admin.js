import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";
import {
  getAllUsers,
  addChallenge,
  editChallenge,
  deleteChallenge,
  getAllSubmissions,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(authenticate, requireAdmin);

router.get("/users", getAllUsers);
router.post("/challenges", addChallenge);
router.put("/challenges/:id", editChallenge);
router.delete("/challenges/:id", deleteChallenge);
router.get("/submissions", getAllSubmissions);

export default router;