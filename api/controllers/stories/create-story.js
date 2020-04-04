const { notificationQueue } = require('../../../constants');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports = async function (req, res) {
  const {
    title,
    content,
    formattedContent,
    topicSlug,
    private,
    draft,
  } = req.body;
  const user = req.user;
  try {
    const topic = await Topics.findOne({
      slug: topicSlug
    }).populate('followers');
    if (!topic) {
      /* throw {
        badRequest: 'Unknown topic'
      }; */
      return res.status(404).json({
        error: 'The topic for story does not exists'
      });
    }
    const storyData = {
      title,
      content,
      formattedContent,
      topic: topic.id,
      private,
      draft,
      author: user.id,
    };
    // Upload file
    req.file('coverPhoto').upload(
      {
        maxBytes: 5120000
      },
      async function uploadComplete(err, uploadedFiles) {
        if (err) {
          // throw 'serverError';
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
          storyData.imageUrl = uploadedImage.secure_url;
          storyData.imageCloudinaryId = uploadedImage.public_id;
        }
        const newStory = await Stories.create(storyData).fetch();

        res.json({
          message: 'Successfully created story',
          data: newStory,
        });
        if (newStory.draft || newStory.private) {
          return;
        }
        const notificationData = {
          name: 'notification',
          notificationType: 'NEW_STORY',
          storyID: newStory.id,
          fromUser: user.id,
          topic: topic.id
        };

        for (let follower of topic.followers) {
          Notifications.publish([follower.id], {
            actionType: 'NEW_STORY',
            forUser: follower.id,
            story: newStory,
            fromUser: user,
            topic,
            read: false
          });
        }

        return sails.helpers.sendToQueue(notificationQueue, notificationData);
      }
    );
  } catch (error) {
    sails.log.error(error);
    return res.status(500).json({
      error: 'Something bad happened',
    })
  }
};

