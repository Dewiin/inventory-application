const pokemon_db = require("../db/pokemonQueries");
const types_db = require("../db/typeQueries");

async function indexGet(req, res) {
	const pokemons = await pokemon_db.getAllPokemon();
	const types = await types_db.getAllTypes();

	res.render("index", { title: "Pokédex", pokemons: pokemons, types: types });
}

module.exports = {
	indexGet,
};
