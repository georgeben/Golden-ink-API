module.exports = {


  friendlyName: 'Get public profile',


  description: 'Retrieves a user\'s public profile',


  inputs: {
    username: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    notFound: {
      description: 'The user was not found',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs) {
    const user = await Users.findOne({
      username: inputs.username,
      deactivated: false
    }).populate('stories')
      .populate('topics')
      .populate('likes');

    if (!user) {
      throw 'notFound';
    }

    user.stories = user.stories.filter(story => story.private === false && story.draft === false);
    return {
      data: user,
    };

  }


};
