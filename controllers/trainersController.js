const trainers_db = require("../db/trainerQueries");

async function trainersListGet(req, res) {
  const trainers = await trainers_db.getAllTrainers();

  res.render("trainers/trainers", { title: "Pokémon Trainers", trainers: trainers });
}

async function trainersCreateGet(req, res) {}

async function trainersCreatePost(req, res) {}

module.exports = {
  trainersListGet,
  trainersCreateGet,
  trainersCreatePost,
};
