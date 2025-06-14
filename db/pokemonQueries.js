const pool = require("./pool");

async function getAllPokemon() {
    try {
        const { rows } = await pool.query('SELECT * FROM pokemons ORDER BY pokedex_id');

        return rows;
    }
    catch(error) {
        console.error("Error fetching all pokemon: ", error);
    }
}

async function insertPokemon(name, sprite, pokedex_id) {
    try {
        await pool.query("INSERT INTO pokemons (name, sprite, pokedex_id) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING", [name, sprite, pokedex_id]);
    }
    catch(error) {
        console.error(`Error inserting ${name} into database: `, error);
    }
}

module.exports = {
    getAllPokemon,
    insertPokemon,
};