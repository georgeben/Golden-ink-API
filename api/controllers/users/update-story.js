const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports = async function (req, res) {
  const user = req.user;
  const updatedData = req.body;
  const slug = req.params.slug;
  try {
    const story = await Stories.findOne({
      slug,
    });
    if (!story) {
      return res.status(404).json({
        error: 'The story you are trying to update does not exist.'
      });
    }

    // Check if the person sending the update req is the author of the story
    if (story.author !== user.id) {
      return res.status(403).json({
        message: 'You cannot perform this action'
      });
    }

    if (updatedData.topicSlug) {
      // if the user is updating the story's topic, i want to check if that topic exists
      const topic = await Topics.findOne({
        slug: updatedData.topicSlug,
      });
      if (!topic) {
        return res.status(404).json({
          error: 'The topic for story does not exists'
        });
      }
      if (topic.id !== story.topic) {
        updatedData.topic = topic.id;
      }
    }

    // Check for file
    req.file('coverPhoto').upload(
      {
        maxBytes: 5120000
      },
      async function uploadComplete(err, uploadedFiles) {
        if (err) {
          return res.status(500).json({
            error: 'Something bad happened',
          });
        }
        if (uploadedFiles.length > 0) {
          const uploadedImage = await sails.helpers.cloudinaryUpload.with({
            path: uploadedFiles[0].fd,
            directory: 'stories'
          });
          // Delete the image
          await fs.unlinkAsync(uploadedFiles[0].fd);
          updatedData.imageUrl = uploadedImage.secure_url;
          updatedData.imageCloudinaryId = uploadedImage.public_id;
        }
        if (Boolean(updatedData.removeCover)) {
          updatedData.imageUrl = '';
          updatedData.imageCloudinaryId = '';
        }
        // Check if the story title has changed
        if (updatedData.title !== story.title) {
          // Create a new slug
          const slug = await sails.helpers.createSlug('stories', updatedData.title);
          updatedData.slug = slug;
        }
        // Update the story
        const updatedStory = await Stories.updateOne({
          slug,
        }).set(updatedData);

        return res.status(200).json({
          message: 'Successfully updated story',
          data: updatedStory,
        });
      }
    );
  } catch (error) {
    sails.log.error(error);
    return res.status(500).json({
      error: 'Something bad happened',
    });
  }

};
