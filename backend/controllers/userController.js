import pool from "../config/db.js";

export async function getProfile(req, res) {
  const { id } = req.params;
  const { rows } = await pool.query("SELECT id, username, email, avatar_url, bio, created_at FROM users WHERE id = $1", [id]);
  if (rows[0]) res.json(rows[0]);
  else res.status(404).json({ error: "User not found" });
}

export async function updateProfile(req, res) {
  const { id } = req.params;
  const { avatar_url, bio } = req.body;
  const { rows } = await pool.query(
    "UPDATE users SET avatar_url = $1, bio = $2 WHERE id = $3 RETURNING id, username, email, avatar_url, bio, created_at",
    [avatar_url, bio, id]
  );
  res.json(rows[0]);
}