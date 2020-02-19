module.exports = {


  friendlyName: 'Update profile',


  description: 'Updates a users profile',


  inputs: {
    name: {
      type: 'string',
    },
    username: {
      type: 'string',
    },
    headline: {
      type: 'string',
    },
    bio: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    // TODO Implement update profile photo
    const user = this.req.user;
    const updatedUser = await Users.updateOne({
      id: user.id,
    }).set(inputs);
    return {
      data: updatedUser,
    };

  }


};
