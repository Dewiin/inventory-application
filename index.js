const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const trainersRouter = require("./routes/trainersRouter");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/trainers", trainersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
