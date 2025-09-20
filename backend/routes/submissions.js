import express from "express";
import { getUserSubmissions } from "../controllers/submissionController.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/user/:id", authenticate, getUserSubmissions);

export default router;