module.exports = {


  friendlyName: 'Update comment',


  description: '',


  inputs: {
    story: {
      type: 'string',
      required: true,
    },
    commentId: {
      type: 'number',
      required: true,
    },
    content: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    forbidden: {
      description: 'The user is restricted from updating the story',
      responseType: 'forbidden',
    },
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

    const comment = await Comments.findOne({
      id: inputs.commentId,
      story: story.id,
    });

    const user = this.req.user;

    if (comment.user !== user.id) {
      throw 'forbidden';
    }
    const updatedComment = await Comments.updateOne({
      id: inputs.commentId,
    }).set({
      content: inputs.content
    });

    return {
      message: 'Successfully updated comment',
      data: updatedComment
    };

  }


};
