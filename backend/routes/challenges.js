import express from "express";
import { getChallenges, getChallenge, submitSolution } from "../controllers/challengeController.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getChallenges);
router.get("/:id", getChallenge);
router.post("/:id/submit", authenticate, submitSolution);

export default router;