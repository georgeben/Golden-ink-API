module.exports = {


  friendlyName: 'Delete bookmark',


  description: 'Removes a story from a user\'s bookmarks',


  inputs: {
    story: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    notFound: {
      description: 'The story/bookmark was not found',
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
      .populate('bookmarks');
    const bookmarkedStory = user.bookmarks.find(bookmarked => bookmarked.id === story.id);
    if (!bookmarkedStory) {
      throw 'notFound';
    }

    await Users.removeFromCollection(user.id, 'bookmarks', story.id);
    return {
      message: 'Successfully removed stories from bookmarks'
    };

  }


};
