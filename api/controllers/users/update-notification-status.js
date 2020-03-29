module.exports = {
  friendlyName: 'Update notification status',

  description: 'Sets a notification\'s read status to true',

  inputs: {
    actionType: {
      type: 'string',
      required: true,
      isIn: ['LIKE', 'COMMENT', 'NEW_STORY'],
    },
    fromUser: {
      type: 'number',
      required: true
    },
    story: {
      type: 'number',
      required: true
    }
  },

  exits: {
    notFound: {
      description: 'The notification resource requested for was not found.',
      responseType: 'notFound'
    }
  },

  fn: async function(inputs) {
    const user = this.req.user;
    const notification = await Notifications.findOne({
      forUser: user.id,
      actionType: inputs.actionType,
      fromUser: inputs.fromUser,
      story: inputs.story,
      read: false
    });
    if (!notification) {
      throw 'notFound';
    }

    await Notifications.updateOne({
      id: notification.id,
      read: false,
    }).set({
      read: true
    });
    const updatedNotification = await Notifications.findOne({
      id: notification.id
    })
      .populate('story')
      .populate('topic')
      .populate('fromUser');

    return {
      message: 'Successfully updated notification',
      data: updatedNotification
    };
  }
};
