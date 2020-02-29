const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const fs = require("fs");
require("./models/Event");

mongoose.connect(keys.mongoURI);
mongoose.connection
  .once("open", () => {
    console.log("oppened");
  })
  .on("error", err => {
    console.log("mongo connection error");
    console.log(err);
  });

const app = express();

// middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes/eventsRoutes")(app);
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
