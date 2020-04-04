module.exports = {


  friendlyName: 'Get feed',


  description: 'Gets a user\'s activity feed',


  inputs: {
    offset: {
      description: 'The number of records to skip',
      type: 'number',
      defaultsTo: 0
    },
    limit: {
      description: 'The maximum number of records to receive',
      type: 'number',
      defaultsTo: 9
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    // A user's feed is just a collection of all the stories that have been posted in all
    // the topics a user follows

    const user = await Users.findOne({
      id: this.req.user.id,
    })
      .populate('topics');
    const topicIds = _.pluck(user.topics, 'id');

    const feed = await Stories.find({
      where: {
        topic: topicIds,
        private: false,
        draft: false,
      }
    })
      .skip(inputs.offset)
      .limit(inputs.limit)
      .populate('author')
      .populate('likedBy')
      .populate('topic')
      .populate('comments')
      .sort('updatedAt DESC');
    const count = await Stories.count({
      where: {
        topic: topicIds,
        private: false,
        draft: false,
      }
    })
    return {
      data: {
        feed,
        count
      },
    };

  }


};
