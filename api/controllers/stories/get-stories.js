module.exports = {


  friendlyName: 'Get stories',


  description: 'Retrieves all the public stories from the database',


  exits: {

  },


  fn: async function () {
    // Get all the stories that have private set to false, and draft set to false
    const publiclyAvailableStories = await Stories.find({
      private: false,
      draft: false,
    })
      .populate('comments')
      .populate('author')
      .populate('topic')
      .populate('likedBy');
    // All done.
    return {
      data: publiclyAvailableStories,
    };

  }


};
