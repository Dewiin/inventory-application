const db = require("../db/pokemonQueries");

async function indexGet(req, res) {
	const pokemons = await db.getAllPokemon(); 

	res.render("index", { title: "Pokédex", pokemons: pokemons });
}

module.exports = {
	indexGet,
};
