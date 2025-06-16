const db = require("../pokemonQueries");

async function fetchPokemonsURL(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to get a response: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function extractPokemonURL(url) {
  try {
    const pokemonJson = await fetchPokemonsURL(url);

    if (!pokemonJson) {
      throw new Error("Failed to fetch pokemon json...");
    }

    return Promise.all(
      pokemonJson.map(async (pokemon, index) => {
        try {
          const name =
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
          const [
            sprite,
            type1,
            type2,
            hp,
            attack,
            defense,
            sp_attack,
            sp_defense,
            speed,
          ] = await extractInfo(pokemon.url);

          if (!sprite || !type1) {
            throw new Error("Failed to retrieve sprite/type...");
          }

          await db.insertPokemon(
            name,
            sprite,
            index,
            type1,
            type2,
            hp,
            attack,
            defense,
            sp_attack,
            sp_defense,
            speed,
          );
        } catch (error) {
          console.error("Error inserting pokemon: ", error);
        }
      }),
    );
  } catch (error) {
    console.error("Error extracting pokemon url: ", error);
  }
}

async function extractInfo(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to get a response: ${response.status}`);
    }

    const result = await response.json();
    const sprite = result.sprites.front_default;
    const type1 = result.types[0].type.name;
    const type2 = result.types.length == 2 ? result.types[1].type.name : null;
    const hp = result.stats[0].base_stat;
    const attack = result.stats[1].base_stat;
    const defense = result.stats[2].base_stat;
    const sp_attack = result.stats[3].base_stat;
    const sp_defense = result.stats[4].base_stat;
    const speed = result.stats[5].base_stat;

    return [
      sprite,
      type1,
      type2,
      hp,
      attack,
      defense,
      sp_attack,
      sp_defense,
      speed,
    ];
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function main() {
  const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

  extractPokemonURL(POKEMON_API_URL);
}

main();
