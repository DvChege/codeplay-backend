import pool from "../config/db.js";

export async function getAllUsers(req, res) {
  const { rows } = await pool.query("SELECT id, username, email, is_admin, created_at FROM users");
  res.json(rows);
}

export async function addChallenge(req, res) {
  const { title, description, difficulty, language, test_cases } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO challenges (title, description, difficulty, language, test_cases) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [title, description, difficulty, language, test_cases]
  );
  res.status(201).json(rows[0]);
}

export async function editChallenge(req, res) {
  const { id } = req.params;
  const { title, description, difficulty, language, test_cases } = req.body;
  const { rows } = await pool.query(
    "UPDATE challenges SET title=$1, description=$2, difficulty=$3, language=$4, test_cases=$5 WHERE id=$6 RETURNING *",
    [title, description, difficulty, language, test_cases, id]
  );
  res.json(rows[0]);
}

export async function deleteChallenge(req, res) {
  const { id } = req.params;
  await pool.query("DELETE FROM challenges WHERE id=$1", [id]);
  res.status(204).end();
}

export async function getAllSubmissions(req, res) {
  const { rows } = await pool.query(
    "SELECT * FROM submissions ORDER BY created_at DESC"
  );
  res.json(rows);
}