module.exports = {


  friendlyName: 'Get topic',


  description: 'Retrieves the list of all topics',


  exits: {
    success: {
      description: 'All the topics were retrieved successfully'
    },
    serverError: {
      description: 'Something unexpected happened',
      responseType: 'serverError'
    }
  },


  fn: async function () {
    try {
      const topics = await Topics.find();
      return {
        topics,
      };
    } catch (error) {
      console.log(error);
      // sails.log()
      throw {
        serverError: error,
      };
    }

  }


};
