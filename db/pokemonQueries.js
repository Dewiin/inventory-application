const pool = require("./pool");

async function getAllPokemon() {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM pokemons ORDER BY pokedex_id",
    );

    return rows;
  } catch (error) {
    console.error("Error fetching all pokemon from database: ", error);
  }
}

async function insertPokemon(
  name,
  sprite,
  pokedex_id,
  type1,
  type2,
  hp,
  attack,
  defense,
  sp_attack,
  sp_defense,
  speed,
) {
  try {
    const SQL = `
		INSERT INTO pokemons (name, sprite, pokedex_id, type1, type2, hp, attack, defense, sp_attack, sp_defense, speed)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT (name) DO NOTHING
		`;

    await pool.query(SQL, [
      name,
      sprite,
      pokedex_id,
      type1,
      type2,
      hp,
      attack,
      defense,
      sp_attack,
      sp_defense,
      speed,
    ]);
  } catch (error) {
    console.error(`Error inserting ${name} into database: `, error);
  }
}

async function searchPokemon(searchValue) {
  try {
    const keyword = `%${searchValue}%`;
    const { rows } = await pool.query(
      "SELECT * FROM pokemons WHERE name ILIKE $1",
      [keyword],
    );

    return rows;
  } catch (error) {
    console.error(
      `Error searching for pokemon containing '${searchValue}' `,
      error,
    );
  }
}

module.exports = {
  getAllPokemon,
  insertPokemon,
  searchPokemon,
};
