const http = require("http");
const app = require("./app");
const bodyParser = require("body-parser");
const fs = require("fs");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const server = http.createServer(app);
server.listen(port, ()=>{
    console.log("listening on port %s", server.address().port);
});