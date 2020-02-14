const mongoose = require("mongoose");
const keys = require("../config/keys");

const Events = mongoose.model("events");

module.exports = app => {
  app.get(keys.API + "events", async (req, res) => {
    const events = await Events.find({});
    console.log(events);

    res.send({ events });
  });

  app.post(keys.API + "addEvent", async (req, res) => {
    console.log(req.body);
    let {
      image,
      liked,
      title,
      date,
      time,
      createdBy,
      description,
      location,
      participants
    } = req.body;

    liked = Boolean(liked);
    participants.global = Number(participants.global);

    console.log(createdBy);
    const event = new Events({
      image,
      liked,
      title,
      date,
      time,
      createdBy,
      description,
      location,
      participants
    });

    const post = await event.save();

    res.send({ post });
  });
};
