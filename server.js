const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));
const path = require('path');
app.use("/poi", express.static(path.join(__dirname, "public")));
const server = http.createServer(app);
server.listen(5501, () => {
  console.log("- server running");
});