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

async function getTrainer(name) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM trainers WHERE name = $1",
      [name],
    );
    return rows;
  } catch (error) {
    console.error(`Error fetching trainer ${name}: `, error);
  }
}

async function getTrainerPokemons(name) {
  try {
    const SQL = `
      SELECT * 
      FROM pokemons p
      JOIN trainer_pokemons tp ON p.id = tp.pokemon_id
      JOIN trainers t ON tp.trainer_id = t.id
      WHERE t.name = $1
    `;

    const { rows } = await pool.query(SQL, [name]);
    return rows;
  } catch (error) {
    console.error(`Error fetching ${name}'s pokemons from database: `, error);
  }
}

module.exports = {
  getAllTrainers,
  insertTrainer,
  getTrainer,
  getTrainerPokemons,
};
