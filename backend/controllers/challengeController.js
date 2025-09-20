import { getAllChallenges, getChallengeById } from "../models/Challenge.js";
import { createSubmission } from "../models/Submission.js";
import { runCodeWithJudge0 } from "../utils/judge0.js";

export async function getChallenges(req, res) {
  const challenges = await getAllChallenges();
  res.json(challenges);
}

export async function getChallenge(req, res) {
  const challenge = await getChallengeById(req.params.id);
  if (challenge) res.json(challenge);
  else res.status(404).json({ error: "Challenge not found" });
}

export async function submitSolution(req, res) {
  const { id: challenge_id } = req.params;
  const { code, language_id } = req.body;
  const user_id = req.user.id;

  // Fetch challenge
  const challenge = await getChallengeById(challenge_id);
  if (!challenge) return res.status(404).json({ error: "Challenge not found" });

  // Run code against test cases
  const judgeResult = await runCodeWithJudge0({ code, language_id, test_cases: challenge.test_cases });

  // Evaluate result and assign points
  const result = judgeResult.passed ? "pass" : (judgeResult.error ? "error" : "fail");
  const points_awarded = result === "pass" ? (challenge.difficulty === "easy" ? 10 : challenge.difficulty === "medium" ? 20 : 30) : 0;

  // Store submission
  const submission = await createSubmission({ user_id, challenge_id, code, result, points_awarded });

  res.json({ result, points_awarded, submission, judgeResult });
}