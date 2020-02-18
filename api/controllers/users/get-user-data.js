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
      .populate('stories');
      if (!user) {
        throw 'unauthorized';
      }
      return {
        user,
      };
    } catch (error) {
      console.log(error);
      throw {
        serverError: error,
      }
    }

  }


};
