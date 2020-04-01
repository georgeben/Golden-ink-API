module.exports = {


  friendlyName: 'Get comment',


  description: 'Retrieve data about a comment',


  inputs: {
    story: {
      type: 'string',
      required: true,
    },
    commentId: {
      type: 'number',
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
    const story = await Stories.findOne({
      slug: inputs.story,
      private: false,
      draft: false,
    });
    if (!story) {
      throw 'notFound';
    }

    const comment = await Comments.findOne({
      id: inputs.commentId,
      story: story.id,
    })
      .populate('user')
      .populate('likedBy');

    if (!comment) {
      throw 'notFound';
    }
    // All done.
    return {
      data: comment
    };

  }


};
