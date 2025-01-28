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
app.get("/", (req, res) => {
  res.redirect(301, "/poi");
});
const server = http.createServer(app);
server.listen(5501, () => {
  console.log("- server running");
});