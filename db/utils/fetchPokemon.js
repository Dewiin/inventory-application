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
					const [sprite, type1, type2] = await extractSpriteAndType(
						pokemon.url,
					);

					if (!sprite || !type) {
						throw new Error("Failed to retrieve sprite/type...");
					}

					await db.insertPokemon(name, sprite, index, type1, type2);
				} catch (error) {
					console.error("Error inserting pokemon: ", error);
				}
			}),
		);
	} catch (error) {
		console.error("Error extracting pokemon url: ", error);
	}
}

async function extractSpriteAndType(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to get a response: ${response.status}`);
		}

		const result = await response.json();
		const sprite = result.sprites.front_default;
		const type1 = result.types[0].type.name;
		const type2 = result.types.length == 2 ? result.types[1].type.name : null;

		return [sprite, type1, type2];
	} catch (error) {
		console.error("Error: ", error);
	}
}

async function main() {
	const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

	extractPokemonURL(POKEMON_API_URL);
}

main();
