module.exports = {


  friendlyName: 'Get user data',


  description: 'Retrieves the details about an authorized user',


  exits: {
    unauthorized: {
      description: 'The user\'s data could not be retrieved',
      responseType: 'unauthorized',
    }
  },


  fn: async function () {

    const user = await Users.findOne({
      id: this.req.user.id,
    });
    if (!user) {
      throw 'unauthorized';
    }
    return {
      user,
    };

  }


};
