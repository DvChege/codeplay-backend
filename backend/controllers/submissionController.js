import { getUserSubmissions } from "../models/Submission.js";

export async function getUserSubmissions(req, res) {
  const { id } = req.params;
  const submissions = await getUserSubmissions(id);
  res.json(submissions);
}