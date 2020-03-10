module.exports = {


  friendlyName: 'Unlike story',


  description: '',


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
      description: 'A user cannot unlike a story that hasn\'t been previously liked',
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

    const likedStory = user.likes.find(likedStory => likedStory.id === story.id);
    if (!likedStory) {
      throw 'forbidden';
    }

    await Users.removeFromCollection(user.id, 'likes', story.id);
    user = await Users.findOne({
      id: this.req.user.id,
    })
      .populate('likes');
    return {
      message: 'Successfully removed stories from liked stories',
      data: user.likes,
    };

  }


};
