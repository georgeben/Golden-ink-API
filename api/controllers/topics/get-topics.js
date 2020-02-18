module.exports = {


  friendlyName: 'Get topic',


  description: 'Retrieves the list of all topics',


  exits: {
    success: {
      description: 'All the topics were retrieved successfully'
    }
  },


  fn: async function () {

    const topics = await Topics.find();
    return {
      topics,
    };

  }


};
