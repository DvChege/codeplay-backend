import pool from "../config/db.js";

export async function createSubmission({ user_id, challenge_id, code, result, points_awarded }) {
  const { rows } = await pool.query(
    `INSERT INTO submissions (user_id, challenge_id, code, result, points_awarded)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [user_id, challenge_id, code, result, points_awarded]
  );
  return rows[0];
}

export async function getUserSubmissions(user_id) {
  const { rows } = await pool.query(
    `SELECT * FROM submissions WHERE user_id = $1 ORDER BY created_at DESC`,
    [user_id]
  );
  return rows;
}