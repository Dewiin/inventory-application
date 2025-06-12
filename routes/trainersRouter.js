const { Router } = require("express");
const trainersController = require("../controllers/trainersController");
const trainersRouter = Router();

trainersRouter.get("/", trainersController.trainersListGet);
trainersRouter.get("/create", trainersController.trainersCreateGet);
trainersRouter.post("/create", trainersController.trainersCreatePost);

module.exports = trainersRouter;
