const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.get("/home/:type", indexController.indexTypeGet);

module.exports = indexRouter;
