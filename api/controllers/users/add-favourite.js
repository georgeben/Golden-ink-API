module.exports = {


  friendlyName: 'Add favourite',


  description: 'Adds a story to the user\'s favourites',


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
    conflict: {
      description: 'The story has already been to favourites',
      responseType: 'conflict',
    }
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

    user.favourites.forEach(fav => {
      if (fav.id === story.id) {
        throw 'conflict';
      }
    });
    await Users.addToCollection(user.id, 'favourites', story.id);
    return {
      message: 'Successfully added story to user\'s favourites',
    }

  }


};
