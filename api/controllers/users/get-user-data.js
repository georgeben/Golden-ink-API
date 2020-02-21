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
        .populate('favourites');
      if (!user) {
        throw 'unauthorized';
      }
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
