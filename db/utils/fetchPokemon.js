const db = require("../pokemonQueries");

async function fetchPokemonURL(url) {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Failed to get a response ${response.status}`);
        }
        
        const data = await response.json();
        return data.results;
    }
    catch (error) {
        console.error("Error: ", error);
    }
}

async function extractPokemonURL(url) {
    try {
        const pokemonJson = await fetchPokemonURL(url);
        
        if(!pokemonJson) {
            throw new Error("Failed to fetch pokemon json...");
        }

        return Promise.all(pokemonJson.map( async (pokemon, index) => {
            try {
                const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                const sprite = await extractSprite(pokemon.url);
                if(!sprite) {
                    throw new Error("Failed to retrieve sprite...");
                }

                // pokemons[index] = {name: `${pokemon.name}`, image: `${sprite}`};
                await db.insertPokemon(name, sprite, index);
            }
            catch (error) {
                console.error("Error: ", error);
            }
        }));
    }
    catch (error) {
        console.error("Error: ", error);
    }
}

async function extractSprite(url) {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Failed to get a response ${response.status}`);
        }

        const result = await response.json();
        return result.sprites.front_default;
    }
    catch (error) {
        console.error("Error: ", error);
    }
}

async function main() {
    const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

    extractPokemonURL(POKEMON_API_URL);
}

main();