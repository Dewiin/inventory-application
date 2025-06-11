
async function indexGet(req, res) {
  res.render("index", {title: "Pokémon Inventory"});
}

module.exports = {
  indexGet
}