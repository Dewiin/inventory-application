const pokemon_db = require("../db/pokemonQueries");
const types_db = require("../db/typeQueries");

async function indexGet(req, res) {
  const pokemons = await pokemon_db.getAllPokemon();
  const types = await types_db.getAllTypes();

  res.render("index", { title: "Pokédex", pokemons: pokemons, types: types });
}

async function indexSearchPost(req, res) {
  const searchValue = req.body.searchPokemon;
  const pokemons = await pokemon_db.searchPokemon(searchValue);
  const types = await types_db.getAllTypes();

  res.render("index", { title: "Pokédex", pokemons: pokemons, types: types });
}

async function indexTypeGet(req, res) {
  const type = req.params.type;

  const pokemons = await types_db.getPokemonByType(type);
  const types = await types_db.getAllTypes();

  res.render("index", { title: "Pokédex", pokemons: pokemons, types: types });
}

async function indexDetailsGet(req, res) {
  const pokemon_name = req.params.name;

  const types = await types_db.getTypes(pokemon_name);

  res.json({ types: types });
}

module.exports = {
  indexGet,
  indexSearchPost,
  indexTypeGet,
  indexDetailsGet
};
