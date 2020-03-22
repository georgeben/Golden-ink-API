module.exports = {


  friendlyName: 'Add bookmark',


  description: 'Adds a story to bookmarks',


  inputs: {
    story: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    notFound: {
      description: 'No story with the specified slug was found in the database.',
      responseType: 'notFound'
    },
    conflict: {
      description: 'The story has already been to bookmarks',
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
    let user = await Users.findOne({
      id: this.req.user.id,
    })
      .populate('bookmarks');

    user.bookmarks.forEach(bookmark => {
      if (bookmark.id === story.id) {
        throw 'conflict';
      }
    });
    await Users.addToCollection(user.id, 'bookmarks', story.id);
    user = await Users.findOne({
      id: this.req.user.id,
    })
      .populate('bookmarks');
    return {
      message: 'Successfully added story to user\'s bookmarks',
      data: user.bookmarks,
    };

  }


};
