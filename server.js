const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes/routes")(app, fs);

const server = http.createServer(app).listen(port, ()=>{
	console.log("listening on port %s", server.address().port);
});