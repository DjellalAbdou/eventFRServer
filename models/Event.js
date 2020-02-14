const mongoose = require("mongoose");

const { Schema } = mongoose;

const eventSchema = new Schema({
  image: String,
  liked: Boolean,
  title: String,
  date: String,
  time: String,
  createdBy: {
    name: String,
    img: String
  },
  description: String,
  location: {
    city: String,
    street: String
  },
  participants: {
    global: Number,
    list: [String]
  }
  //_user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("events", eventSchema);
