module.exports = {


  friendlyName: 'Delete comment',


  description: 'Deletes a comment',


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
      description: 'The story to update was not found',
      responseType: 'notFound',
    },
    forbidden: {
      description: 'The user is restricted from updating the story',
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

    const comment = await Comments.findOne({
      id: inputs.commentId,
      story: story.id,
    });

    if (!comment) {
      throw 'notFound';
    }

    const user = this.req.user;

    if (comment.user !== user.id) {
      throw 'forbidden';
    }

    const deletedComment = await Comments.destroyOne({
      id: inputs.commentId,
      story: story.id,
    });
    return {
      message: 'Successfully deleted comment',
      data: deletedComment,
    };

  }


};
