
module.exports = function(req, res) {
  const user = req.user;
  const requestData = req.body;
  //Check for updated profile photo
  req.file('profilePhoto').upload(
    {
      maxBytes: 5120000,
      adapter: require('skipper-s3'),
      key: sails.config.aws.accessKey,
      secret: sails.config.aws.secretAccessKey,
      bucket: 'golden-ink-user-photos'
    },
    async function uploadComplete(err, uploadedFiles) {
      if (err) {
        return res.serverError();
      }
      if (uploadedFiles.length > 0) {
        const profilePhotoUrl = `${sails.config.aws.s3baseUrl}/${uploadedFiles[0].fd}`;
        requestData.profilePhotoUrl = profilePhotoUrl;
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
