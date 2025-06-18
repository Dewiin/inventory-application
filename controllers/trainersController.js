const trainers_db = require("../db/trainerQueries");

async function trainersListGet(req, res) {
  const trainers = await trainers_db.getAllTrainers();

  res.render("trainers/trainers", {
    title: "Pokémon Trainers",
    trainers: trainers,
  });
}

async function trainersCreatePost(req, res) {
  const trainer_name = req.body["trainer-name"];
  const trainer_gender = req.body["trainer-gender"];

  await trainers_db.insertTrainer(trainer_name, trainer_gender);

  res.redirect("/trainers");
}

async function trainerDetailsGet(req, res) {
  const { name } = req.params;

  const pokemons = await trainers_db;

  res.render("trainers/trainerDetails", {
    title: "Trainer Details",
    trainer: name,
  });
}

module.exports = {
  trainersListGet,
  trainersCreatePost,
  trainerDetailsGet,
};
