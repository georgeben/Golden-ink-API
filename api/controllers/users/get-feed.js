module.exports = {


  friendlyName: 'Get feed',


  description: 'Gets a user\'s activity feed',


  inputs: {
    offset: {
      description: 'The number of records to skip',
      type: 'number'
    },
    limit: {
      description: 'The maximum number of records to receive',
      type: 'number'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    // TODO A user's feed is just a collection of all the stories that have been posted in all
    // the topics a user follows
    // All done.

    const user = await Users.findOne({
      id: this.req.user.id,
    })
      .populate('topics');
    const feed = [];
    for (let topic of user.topics) {
      const stories = await Stories.find({
        topic: topic.id,
        private: false,
        draft: false,
      })
        .populate('author')
        .populate('likedBy')
        .populate('comments');
      feed.push(stories);
    }
    return {
      data: feed,
    };

  }


};
