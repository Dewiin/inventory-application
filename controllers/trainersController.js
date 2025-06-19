const { body, validationResult } = require("express-validator");
const trainers_db = require("../db/trainerQueries");
const pokemon_db = require("../db/pokemonQueries");
const pool = require("../db/pool");

const validateTrainer = [
  body("trainer-name")
    .trim()
    .notEmpty()
    .withMessage("Trainer name must not be empty.")
    .matches(/^\S+$/)
    .withMessage("Trainer name can not contain any spaces.")
    .custom(async (val) => {
      const lowerName = val.toLowerCase();
      const { rows } = await pool.query(
        "SELECT * FROM trainers WHERE LOWER(name) = $1",
        [lowerName],
      );
      if (rows.length > 0) {
        throw new Error("Trainer name already exists");
      }
      return true;
    }),
];

async function trainersListGet(req, res) {
  const trainers = await trainers_db.getAllTrainers();

  res.render("trainers/trainers", {
    title: "Pokémon Trainers",
    trainers: trainers,
  });
}

async function trainersCreatePost(req, res) {
  const errors = validationResult(req);
  // if (!errors.empty) {
  //   res.render();
  // }
  const trainer_name = req.body["trainer-name"];
  const trainer_gender = req.body["trainer-gender"];

  await trainers_db.insertTrainer(trainer_name, trainer_gender);

  res.redirect("/trainers");
}

async function trainerDetailsGet(req, res) {
  const { name } = req.params;

  const trainer = await trainers_db.getTrainer(name);
  const pokemons = await trainers_db.getTrainerPokemons(name);

  res.render("trainers/trainerDetails", {
    title: `${name}'s Trainer Details`,
    trainer: trainer,
    pokemons: pokemons,
  });
}

async function trainerPokemonGet(req, res) {
  const { name } = req.params;
  const pokemons = await pokemon_db.getAllPokemon();
  const trainer = await trainers_db.getTrainer(name);

  res.render("trainers/trainerAddPokemon", {
    title: `${name}'s Pokemon`,
    pokemons: pokemons,
    trainer: trainer
  });
}

async function trainerPokemonPost(req, res) {
  const { name } = req.params;
  const selectedPokemon = req.body.pokemon;

  const trainer = await trainers_db.getTrainer(name);
  const trainerID = trainer.id;

  if(Array.isArray(selectedPokemon)) {
    selectedPokemon.forEach(async (pokemon) => {
      await trainers_db.insertPokemonForTrainer(trainerID, pokemon); 
    });
  }

  res.redirect(`/trainers/${name}/details`);
}

module.exports = {
  trainersListGet,
  trainersCreatePost,
  trainerDetailsGet,
  trainerPokemonGet,
  trainerPokemonPost,
};
