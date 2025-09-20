import pool from "../config/db.js";

export async function findUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0];
}

export async function createUser({ username, email, password_hash, avatar_url = '', bio = '' }) {
  const { rows } = await pool.query(
    `INSERT INTO users (username, email, password_hash, avatar_url, bio)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [username, email, password_hash, avatar_url, bio]
  );
  return rows[0];
}