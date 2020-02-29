const mongoose = require("mongoose");

const { Schema } = mongoose;

const eventSchema = new Schema({
  image: String,
  liked: { default: false, type: String },
  title: String,
  date: String,
  timeStart: String,
  timeEnd: String,
  // createdBy: {
  //   name: String,
  //   img: String
  // },
  description: String,
  location: {
    city: String,
    street: String
  },
  geoLocation: {
    latitude: String,
    longitude: String
  },
  participants: {
    global: Number,
    list: [String]
  },
  categorie: String
  //_user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("events", eventSchema);
