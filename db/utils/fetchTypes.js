const db = require("../typeQueries");

async function fetchTypesUrl(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to get a response: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching types url: ", error);
  }
}

async function extractTypeUrl(url) {
  try {
    const typesJson = await fetchTypesUrl(url);

    await Promise.all(
      typesJson.map(async (types) => {
        try {
          const type = types.name;
          const sprite = await extractSprite(types.url);

          if (type != "steel") {
            await db.insertType(type, sprite);
          }
        } catch (error) {
          console.error("Error inserting type: ", error);
        }
      }),
    );
  } catch (error) {
    console.error("Error extracting type url: ", error);
  }
}

async function extractSprite(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to get a response: ${response.status}`);
    }

    const result = await response.json();
    const sprite = result.sprites["generation-iv"].platinum.name_icon;
    return sprite;
  } catch (error) {
    console.error("Error extracting type sprite: ", error);
  }
}

async function main() {
  console.log("populating types...");
  
  const TYPES_API_URL = "https://pokeapi.co/api/v2/type/?limit=16";

  extractTypeUrl(TYPES_API_URL);

  console.log("finished populating types.");
}

main();
