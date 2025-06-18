const { Router } = require("express");
const trainersController = require("../controllers/trainersController");
const trainersRouter = Router();

trainersRouter.get("/", trainersController.trainersListGet);
trainersRouter.post("/", trainersController.trainersCreatePost);
trainersRouter.get("/:name/details", trainersController.trainerDetailsGet);

module.exports = trainersRouter;
