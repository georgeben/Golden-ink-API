const cloudinary = require('cloudinary').v2;
module.exports = {


  friendlyName: 'Cloudinary upload',


  description: 'Uploads an image to cloudinary',


  inputs: {
    path: {
      type: 'string',
      description: 'The location where the image to be uploaded is stored on disk',
      required: true,
    },
    directory: {
      type: 'string',
      description: 'The destination folder to store the image on cloudinary',
      required: true,
    }
  },


  exits: {

    success: {
      description: 'Successfully uploaded image to cloudinary',
    },

  },


  fn: async function (inputs) {
    cloudinary.config({
      cloud_name: sails.config.cloudinary.cloud_name,
      api_key: sails.config.cloudinary.api_key,
      api_secret: sails.config.cloudinary.api_secret,
    });

    let uploadedImage = await cloudinary.uploader.upload(inputs.path, {
      folder: `golden-ink/${inputs.directory}/`,
    });

    return uploadedImage;
  }


};

