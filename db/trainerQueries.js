const pool = require("./pool");

async function getAllTrainers() {
  try {
    const { rows } = await pool.query("SELECT * FROM trainers");
    return rows;
  } catch (error) {
    console.error("Error fetching all trainer: ", error);
  }
}

async function insertTrainer(name, gender) {
  try {
    await pool.query(
      "INSERT INTO trainers (name, gender) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING",
      [name, gender],
    );
  } catch (error) {
    console.error(`Error inserting ${name} into database: `, error);
  }
}

module.exports = {
  getAllTrainers,
  insertTrainer,
};
