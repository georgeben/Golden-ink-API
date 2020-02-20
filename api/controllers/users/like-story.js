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
    const user = this.req.user;

    await Users.addToCollection(user.id, 'likes', story.id);
    return {
      message: 'Successfully added story to likes'
    };

  }


};
