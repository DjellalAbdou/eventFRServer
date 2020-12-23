const multer = require("multer");
const fs = require("fs");

const isDirExist = (dir) => {
  if (!fs.existsSync(dir)) {
    console.log("cant find directory hahahahah ");
    fs.mkdirSync(dir, { recursive: true });
    fs.chmodSync(dir, 0o777);
  }
};

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    isDirExist("./images");
    callback(null, "./images");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    callback(null, true);
  } else {
    callback({ message: "unsupported file format" }, false);
  }
};

exports.upload = multer({
  storage: Storage,
  limits: { fileSize: 1024 * 1024 * 20 },
  fileFilter,
});
