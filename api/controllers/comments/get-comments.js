module.exports = {


  friendlyName: 'Get comments',


  description: '',


  inputs: {
    story: {
      type: 'string',
      required: true,
    },
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
    const comments = await Comments.find({
      story: story.id,
    })
      .populate('user')
      .populate('subComments');
    // All done.
    return {
      comments,
    };

  }


};
