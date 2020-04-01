const { notificationQueue } = require('../../../constants');
module.exports = {


  friendlyName: 'Like comment',


  description: 'Likes a comment',


  inputs: {
    story: {
      type: 'string',
      required: true
    },
    commentId: {
      type: 'number',
      required: true,
    }
  },


  exits: {
    notFound: {
      description: 'No story with the specified slug was found in the database.',
      responseType: 'notFound'
    },
    conflict: {
      description: 'The user has already liked that comment',
      responseType: 'conflict'
    }
  },


  fn: async function (inputs) {
    const user = this.req.user;
    const story = await Stories.findOne({
      slug: inputs.story,
      private: false,
      draft: false,
    });
    if (!story) {
      throw 'notFound';
    }
    let comment = await Comments.findOne({
      id: inputs.commentId
    })
      .populate('likedBy');
    if (!comment) {
      throw 'notFound';
    }

    if (comment.likedBy.some(item => item.id === user.id)) {
      // The user has already liked the story
      throw 'conflict';
    }
    await Comments.addToCollection(inputs.commentId, 'likedBy', user.id);
    comment = await Comments.findOne({
      id: inputs.commentId,
    })
      .populate('likedBy');

    this.res.status(200).json({
      message: 'Successfully liked comment',
      data: comment.likedBy
    });

    const notification = await Notifications.findOne({
      fromUser: user.id,
      forUser: story.author,
      actionType: 'LIKE',
      story: story.id,
      comment: comment.id,
    });

    if (notification) {
      sails.log.debug('Notification already exists');
      return;
    }

    const notificationData = {
      name: 'notification',
      notificationType: 'LIKE',
      storyID: story.id,
      fromUser: this.req.user.id,
      forUser: story.author,
      comment: comment.id
    };

    Notifications.publish([story.author], {
      actionType: 'LIKE',
      forUser: story.author,
      story: story,
      fromUser: user,
      read: false
    });
    return sails.helpers.sendToQueue(notificationQueue, notificationData);


  }


};
