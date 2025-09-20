import { getLeaderboard } from "../models/Leaderboard.js";

export async function getLeaderboard(req, res) {
  const leaderboard = await getLeaderboard();
  res.json(leaderboard);
}