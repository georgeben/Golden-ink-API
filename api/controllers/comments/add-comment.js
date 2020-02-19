module.exports = {


  friendlyName: 'Add comment',


  description: 'Adds a comment to a story',


  inputs: {
    story: {
      type: 'string',
      required: true,
    },
    content: {
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
    // Check that the story exists
    const story = await Stories.findOne({
      slug: inputs.story,
      private: false,
      draft: false,
    });
    if (!story) {
      throw 'notFound';
    }
    const user = this.req.user;

    const comment = await Comments.create({
      content: inputs.content,
      story: story.id,
      user: user.id,
    }).fetch();

    return {
      message: 'Successfully added comment',
      data: comment,
    };

  }


};
