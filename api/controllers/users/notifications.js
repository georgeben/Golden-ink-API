module.exports = {


  friendlyName: 'Notifications',


  description: 'Retrieves a user\'s notifications',


  inputs: {

  },


  exits: {

  },


  fn: async function () {
    // Fetch all the notifications for a user
    const interactionNotifications = await Notifications.find({
      or: [
        { forUser: this.req.user.id }
      ]
    })
      .populate('story')
      .populate('topic')
      .populate('fromUser');

    if (this.req.isSocket) {
      Notifications.subscribe(this.req, [this.req.user.id]);
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
