import pool from "../config/db.js";

export async function getLeaderboard() {
  const { rows } = await pool.query(
    `SELECT l.*, u.username, u.avatar_url
     FROM leaderboard l
     JOIN users u ON l.user_id = u.id
     ORDER BY l.total_points DESC, l.rank ASC LIMIT 50`
  );
  return rows;
}