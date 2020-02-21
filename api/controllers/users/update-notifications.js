module.exports = {


  friendlyName: 'Update notifications',


  description: 'Update\'s a user\'s email notification settings ',


  inputs: {
    daily: {
      description: 'Receive daily email digests',
      type: 'boolean',
      required: true
    },
    weekly: {
      description: 'Receive weekly email digests',
      type: 'boolean',
      required: true
    },
    reactions: {
      description: 'Receive email notifications when someone reacts to your story',
      type: 'boolean',
      required: true
    },
  },


  exits: {

  },


  fn: async function ({ daily, weekly, reactions }) {

    const user = await Users.updateOne({
      id: this.req.user.id,
    }).set({
      emailNotificationSettings: {
        daily,
        weekly,
        reactions,
      },
    });

    return {
      message: 'Successfully updated email notification settings',
      data: user,
    };

  }


};
