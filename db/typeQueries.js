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

module.exports = {
	getAllTypes,
	insertType,
};
