const { notificationQueue } = require('../../../constants');

module.exports = {


  friendlyName: 'Like story',


  description: 'Adds a story to a user\'s liked stories',


  inputs: {
    story: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    notFound: {
      description: 'No topic with the specified slug was found in the database.',
      responseType: 'notFound'
    },
    forbidden: {
      description: 'A user cannot like one story twice',
      responseType: 'forbidden',
    },
  },


  fn: async function (inputs) {
    const story = await Stories.findOne({
      slug: inputs.story,
      private: false,
      draft: false,
    });
    if (!story) {
      throw 'notFound';
    }
    let user = await Users.findOne({
      id: this.req.user.id,
    })
      .populate('likes');
    user.likes.forEach(likedStory => {
      if (likedStory.id === story.id) {
        throw 'forbidden';
      }
    });
    await Users.addToCollection(user.id, 'likes', story.id);
    user = await Users.findOne({
      id: this.req.user.id,
    })
      .populate('likes');

    const data = {
      name: 'notification',
      notificationType: 'LIKE',
      storyID: story.id,
      fromUser: this.req.user.id,
      forUser: story.author,
    };
    this.res.status(200).json({
      message: 'Successfully added story to likes',
      data: user.likes,
    });
    const notification = await Notifications.findOne({
      fromUser: this.req.user.id,
      forUser: story.author,
      actionType: 'LIKE',
      story: story.id,
    });
    if (notification) {
      return;
    }
    Notifications.publish([story.author], {
      actionType: 'LIKE',
      forUser: story.author,
      story: story,
      fromUser: user,
      read: false
    });
    return sails.helpers.sendToQueue(notificationQueue, data);

  }


};
