const { notificationQueue } = require('../../../constants');
module.exports = {


  friendlyName: 'Add comment',


  description: 'Adds a comment to a story',


  inputs: {
    story: {
      type: 'string',
      required: true,
    },
    content: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    notFound: {
      description: 'No topic with the specified slug was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs) {
    // Check that the story exists
    const story = await Stories.findOne({
      slug: inputs.story,
      private: false,
      draft: false,
    });
    if (!story) {
      throw 'notFound';
    }
    const user = this.req.user;

    let comment = await Comments.create({
      content: inputs.content,
      story: story.id,
      user: user.id,
    }).fetch();
    const createdComment = await Comments.findOne({
      id: comment.id
    })
      .populate('user');

    this.res.status(201).json({
      message: 'Successfully added comment',
      data: createdComment,
    });

    // TODO Emit event to create NEW COMMENT notification
    // TODO If a user is mentioned in a comment, emit event to create a MENTION notification

    const notificationData = {
      name: 'notification',
      notificationType: 'COMMENT',
      storyID: story.id,
      fromUser: user.id,
      forUser: story.author,
    };
    Notifications.publish([story.author], {
      actionType: 'COMMENT',
      forUser: story.author,
      story: story,
      fromUser: user,
      read: false
    });
    return sails.helpers.sendToQueue(notificationQueue, notificationData);


  }


};
