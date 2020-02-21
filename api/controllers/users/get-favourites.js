module.exports = {


  friendlyName: 'Get favourites',


  description: 'Retrieves a user\'s list of favourite stories',


  exits: {

  },


  fn: async function () {
    // TODO How to select just one field in a query
    const user = await Users.findOne({
      id: this.req.user.id,
    })
    .populate('favourites');
    return {
      data: user.favourites
    };

  }


};
