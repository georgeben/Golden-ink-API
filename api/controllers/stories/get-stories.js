module.exports = {


  friendlyName: 'Get stories',


  description: 'Retrieves all the public stories from the database',

  inputs: {
    offset: {
      description: 'The number of records to skip',
      type: 'number',
      defaultsTo: 0
    },
    limit: {
      description: 'The maximum number of records to receive',
      type: 'number',
      defaultsTo: 12
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    // Get all the stories that have private set to false, and draft set to false
    const publiclyAvailableStories = await Stories.find({
      private: false,
      draft: false,
    })
      .populate('comments')
      .populate('author')
      .populate('topic')
      .populate('likedBy')
      .sort('updatedAt DESC')
      .skip(inputs.offset)
      .limit(inputs.limit);

    const count = await Stories.count({
      private: false,
      draft: false,
    });
    return {
      data: {
        stories: publiclyAvailableStories,
        count,
      },
    };

  }


};
