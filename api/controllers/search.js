module.exports = {


  friendlyName: 'Search',


  description: 'Search something.',


  inputs: {
    query: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    badRequest: {
      description: 'A malformed googleIdToken was sent',
      responseType: 'badRequest'
    },
  },


  fn: async function (inputs) {
    const { query } = inputs;
    const userResults = await Users.find({
      where: {
        or: [
          { name: { contains: query } },
          { username: { contains: query } },
          { headline: { contains: query } },
        ]
      }
    });
    const topicResults = await Topics.find({
      name: { contains: query }
    });

    const storyResults = await Stories.find({
      or: [
        {
          title: { contains: query },
          draft: false,
          private: false,
        },
        {
          content: { contains: query },
          draft: false,
          private: false,
        },
      ]
    })
      .populate('author')
      .populate('likedBy');

    return {
      data: {
        users: userResults,
        topics: topicResults,
        stories: storyResults
      }
    };

  }


};
