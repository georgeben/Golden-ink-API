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
    const user = await Users.findOne({
      id: this.req.user.id,
    })
      .populate('likes');
    user.likes.forEach(likedStory => {
      if (likedStory.id === story.id) {
        throw 'forbidden';
      }
    });
    await Users.addToCollection(user.id, 'likes', story.id);
    // TODO Emit event to create LIKE story notification
    return {
      message: 'Successfully added story to likes'
    };

  }


};
