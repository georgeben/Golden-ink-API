module.exports = {


  friendlyName: 'Get user tories',


  description: 'Retrieves the stories created by a user',


  exits: {
    serverError: {
      description: 'Something unexpected happened',
      responseType: 'serverError'
    }
  },


  fn: async function () {
    const user = this.req.user;
    try {
      const stories = await Stories.find({
        author: user.id
      })
        .sort('updatedAt DESC')
        .populate('comments')
        .populate('topic')
      .populate('author');

      return {
        data: stories,
      };
    } catch (error) {
      sails.log.error(error);
      throw 'serverError';
    }
  }


};
