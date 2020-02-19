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
      });

      return {
        stories,
      };
    } catch (error) {
      console.log(error);
      throw 'serverError';
    }
  }


};