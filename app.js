const express = require("express");
const app = express();
const rotaExemplo = require("./routes/example");

app.use("/example", rotaExemplo);

module.exports = app;