const cloudinary = require("cloudinary").v2;
const keys = require("../config/keys");

cloudinary.config({
  cloud_name: keys.CLOUDINARY_CLOUD_NAME,
  api_key: keys.CLOUDINARY_API_KEY,
  api_secret: keys.CLOUDINARY_API_SECRET
});

exports.uploads = (file, folder) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(
      file,
      { resource_type: "image", folder },
      (error, result) => {
        resolve({
          url: result.url,
          id: result.public_id
        });
      }
    );
  });
};
