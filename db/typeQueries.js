const pool = require("./pool");

async function getAllTypes() {
	try {
		const { rows } = await pool.query("SELECT * FROM types ORDER BY name");

		return rows;
	} catch (error) {
		console.error("Error fetching all types from database: ", error);
	}
}

async function insertType(name, sprite) {
	try {
		await pool.query(
			"INSERT INTO types (name, sprite) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING",
			[name, sprite],
		);
	} catch (error) {
		console.error(`Error inserting ${name} into database: `, error);
	}
}

async function getPokemonByType(type) {
	try {
		const { rows } = await pool.query(
			"SELECT * FROM pokemons WHERE type1 = $1 OR type2 = $1 ORDER BY pokedex_id",
			[type],
		);

		return rows;
	} catch (error) {
		console.error(
			`Error fetching ${type} type pokemon from the database: `,
			error,
		);
	}
}

async function getTypes(pokemon_name) {
	try {
		const SQL = `
        SELECT * FROM types t WHERE 
        t.name = (SELECT type1 FROM pokemons p WHERE p.name = $1)
        OR t.name = (SELECT type2 FROM pokemons p WHERE p.name = $1)
        `;
		const { rows } = await pool.query(SQL, [pokemon_name]);

		return rows;
	} catch (error) {
		console.error(`Error getting ${pokemon_name} types: `, error);
	}
}

module.exports = {
	getAllTypes,
	insertType,
	getPokemonByType,
	getTypes,
};
