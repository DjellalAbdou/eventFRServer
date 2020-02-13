const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

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

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
