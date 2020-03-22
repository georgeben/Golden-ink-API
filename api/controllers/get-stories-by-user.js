module.exports = {


  friendlyName: 'Get stories by user',


  description: '',


  inputs: {
    username: {
      type: 'string',
      required: true
    }
  },


  exits: {
    notFound: {
      description: 'The requested resource was not found',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs) {
    const user = await Users.findOne({
      username: inputs.username
    });
    if (!user) {
      throw {
        notFound: {
          error: 'The user does not exist',
        }
      }
    }
    const stories = await Stories.find({
      author: user.id,
      draft: false,
      private: false,
    })
      .populate('topic')
      .populate('likedBy');

    stories.forEach((story) => {
      story.author = user;
    });

    return {
      data: stories
    };

  }


};
