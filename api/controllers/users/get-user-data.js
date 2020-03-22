module.exports = {


  friendlyName: 'Get user data',


  description: 'Retrieves the details about an authorized user',


  exits: {
    unauthorized: {
      description: 'The user\'s data could not be retrieved',
      responseType: 'unauthorized',
    },
    serverError: {
      description: 'Something unexpected happened',
      responseType: 'serverError'
    }
  },


  fn: async function () {
    try {
      const user = await Users.findOne({
        id: this.req.user.id,
      })
        .populate('stories')
        .populate('topics')
        .populate('likes')
        .populate('bookmarks')
        .populate('favourites');

      if (!user) {
        throw 'unauthorized';
      }
      const bookmarks = await Stories.find({
        where: {
          id: _.pluck(user.bookmarks, 'id'),
        },
        select: ['id', 'title', 'content', 'slug', 'imageUrl', 'private', 'draft', 'topic', 'author', 'updatedAt', 'createdAt']
      })
        .populate('topic')
        .populate('author');
      user.bookmarks = bookmarks;

      const likes = await Stories.find({
        where: {
          id: _.pluck(user.likes, 'id'),
        },
        select: ['id', 'title', 'content', 'slug', 'imageUrl', 'private', 'draft', 'topic', 'author', 'updatedAt', 'createdAt']
      })
        .populate('topic')
        .populate('author');
      user.likes = likes;
      return {
        data: user,
      };
    } catch (error) {
      sails.log.error(error);
      if (error === 'unauthorized') {
        throw error;
      }
      throw {
        serverError: error,
      };
    }

  }


};
