import pool from "../config/db.js";

export async function getAllChallenges() {
  const { rows } = await pool.query("SELECT * FROM challenges");
  return rows;
}

export async function getChallengeById(id) {
  const { rows } = await pool.query("SELECT * FROM challenges WHERE id = $1", [id]);
  return rows[0];
}