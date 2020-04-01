module.exports = {


  friendlyName: 'Unlike comment',


  description: 'Unlike a comment',


  inputs: {
    story: {
      type: 'string',
      required: true
    },
    commentId: {
      type: 'number',
      required: true,
    }
  },


  exits: {
    notFound: {
      description: 'No story with the specified slug was found in the database.',
      responseType: 'notFound'
    },
    forbidden: {
      description: 'A user cannot unlike a comment that hasn\'t been previously liked',
      responseType: 'forbidden',
    },
  },


  fn: async function (inputs) {
    const user = this.req.user;
    const story = await Stories.findOne({
      slug: inputs.story,
      private: false,
      draft: false,
    });
    if (!story) {
      throw 'notFound';
    }
    let comment = await Comments.findOne({
      id: inputs.commentId
    })
      .populate('likedBy');
    if (!comment) {
      throw 'notFound';
    }
    if (!(comment.likedBy.some(item => item.id === user.id))) {
      throw 'forbidden';
    }
    await Comments.removeFromCollection(comment.id, 'likedBy', user.id);
    comment = await Comments.findOne({
      id: inputs.commentId,
    })
      .populate('likedBy');

    this.res.status(200).json({
      message: 'Successfully un-liked comment',
      data: comment.likedBy
    });

  }


};
