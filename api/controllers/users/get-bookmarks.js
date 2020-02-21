module.exports = {


  friendlyName: 'Get bookmarks',


  description: 'Retrieves a user\'s bookmarked stories',


  exits: {

  },


  fn: async function () {
    const user = await Users.findOne({
      id: this.req.user.id,
    })
    .populate('bookmarks');
    return {
      data: user.bookmarks
    };

  }


};
