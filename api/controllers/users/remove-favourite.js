module.exports = {


  friendlyName: 'Remove favourite',


  description: 'Removes a story from a user\'s favourites',


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
      .populate('favourites');
    const favStory = user.favourites.find(favourite => favourite.id === story.id);
    if (!favStory) {
      throw 'notFound';
    }

    await Users.removeFromCollection(user.id, 'favourites', story.id);
    return {
      message: 'Successfully removed stories from favourites'
    };

  }


};
