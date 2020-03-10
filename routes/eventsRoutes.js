const mongoose = require("mongoose");
const keys = require("../config/keys");
const fs = require("fs");
const cloudinary = require("../middlewares/cloudinary");
const multer = require("../middlewares/multerMiddleware");

const Events = mongoose.model("events");

module.exports = app => {
  app.get(keys.API + "events", async (req, res) => {
    const events = await Events.find({});
    console.log(events);

    res.send({ events });
  });

  app.get(keys.API + "likedEvents", async (req, res) => {
    const events = await Events.find({ liked: "true" });

    console.log(events);

    res.send({ events });
  });

  app.put(keys.API + "likeEvent/:id", async (req, res) => {
    console.log("entered update like");
    let newEvent = await Events.findByIdAndUpdate(
      { _id: req.params.id },
      { liked: req.body.liked }
    );
    newEvent = await Events.findById({ _id: req.params.id });
    res.send(newEvent);
  });

  app.get(keys.API + "events/search", async (req, res) => {
    console.log("entered search");
    let searchString = req.query.name;
    var resultingEvents = null;
    if (searchString !== "") {
      let myregex = new RegExp("[^,]*" + searchString + "[^,]*");
      resultingEvents = await Events.find({
        title: { $in: [myregex] }
      });
    } else {
      resultingEvents = await Events.find({});
    }

    console.log(resultingEvents);

    res.send({ resultingEvents });
  });

  app.post(
    keys.API + "addEvent",
    multer.upload.array("imageDetails", 2),
    async (req, res) => {
      console.log("dadadadadadaadaaad");
      console.log(req.body);
      console.log(req.files);

      //console.log(res);

      const uploader = async path => await cloudinary.uploads(path, "askip");

      const { path } = req.files[0];
      const newPath = await uploader(path);
      fs.unlinkSync(path);

      res.status(200);
      let {
        name,
        description,
        city,
        street,
        nbParticipant,
        date,
        timeStart,
        timeEnd,
        categorie,
        //markerLatLng,
        markerLat,
        markerLng
      } = req.body;

      const event = new Events({
        image: newPath.url,
        title: name,
        date,
        timeStart,
        timeEnd,
        description,
        location: {
          city,
          street
        },
        geoLocation: {
          latitude: markerLat,
          longitude: markerLng
        },
        participants: {
          global: parseInt(nbParticipant, 10),
          list: []
        },
        categorie
      });

      const post = await event.save();

      res.send({ post });
      //res.send({ hi: "dadadadad" });
    }
  );
};
