module.exports = {


  friendlyName: 'Notifications',


  description: 'Retrieves a user\'s notifications',


  inputs: {

  },


  exits: {

  },


  fn: async function () {
    // Fetch all the notifications for a user
    // Fetch all the notifications for new stories published in the topics a user follows

    const user = await Users.findOne({
      id: this.req.user.id
    })
      .populate('topics');

    const topicIds = user.topics.map(topic => topic.id);
    const interactionNotifications = await Notifications.find({
      or: [
        { forUser: this.req.user.id },
        { topic: topicIds}
      ]
    })
      .populate('story')
      .populate('topic')
      .populate('fromUser');

    if (this.req.isSocket) {
      Notifications.subscribe(this.req, [this.req.user.id]);
      Stories.subscribe(this.req, topicIds);
      return {
        // webSocketId: sails.sockets.getId(this.req),
        message: 'Successfully retrieved notifications',
        data: interactionNotifications,
      };
    }
    return {
      message: 'Successfully retrieved notifications',
      data: interactionNotifications,
    };
  }


};
