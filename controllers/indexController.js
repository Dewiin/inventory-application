async function indexGet(req, res) {
	res.render("index", { title: "Pokédex" });
}

module.exports = {
	indexGet,
};
