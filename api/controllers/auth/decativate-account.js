module.exports = {


  friendlyName: 'Decativate account',


  description: 'Deactivates a user\'s account',


  exits: {

  },


  fn: async function () {
    const user = await Users.updateOne({
      id: this.req.user.id,
      deactivated: false,
    }).set({
      deactivated: true
    });

    return {
      message: `Successfully deactivated account. Sorry to see you go, ${user.name} `
    };

  }


};
