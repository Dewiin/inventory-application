async function trainersListGet(req, res) {
  res.render("trainers/trainers", { title: "Pokémon Trainers" });
}

async function trainersCreateGet(req, res) {}

async function trainersCreatePost(req, res) {}

module.exports = {
  trainersListGet,
  trainersCreateGet,
  trainersCreatePost,
};
