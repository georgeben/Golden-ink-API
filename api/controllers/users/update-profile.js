const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports = function(req, res) {
  const user = req.user;
  const requestData = req.body;
  //Check for updated profile photo
  req.file('profilePhoto').upload(
    {
      maxBytes: 5120000,
    },
    async function uploadComplete(err, uploadedFiles) {
      if (err) {
        return res.serverError();
      }
      /* if (uploadedFiles.length > 0) {
        const profilePhotoUrl = `${sails.config.aws.s3baseUrl}/${uploadedFiles[0].fd}`;
        requestData.profilePhotoUrl = profilePhotoUrl;
      } */
      if (uploadedFiles.length > 0) {
        const uploadedImage = await sails.helpers.cloudinaryUpload.with({
          path: uploadedFiles[0].fd,
          directory: 'user-photo'
        });
        // Delete the image
        await fs.unlinkAsync(uploadedFiles[0].fd);
        requestData.profilePhotoUrl = uploadedImage.secure_url;
        requestData.profilePhotoCloudinaryId = uploadedImage.public_id;
      }
      const updatedUser = await Users.updateOne({
        id: user.id
      }).set(requestData);
      return res.json({
        data: updatedUser
      });
    }
  );
};
