module.exports = {


  friendlyName: 'Get topic stories',


  description: 'Retrieves all the stories related to a topic',


  inputs: {
    slug: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    notFound: {
      description: 'No topic with the specified slug was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs) {
    const topic = await Topics.findOne({
      slug: inputs.slug,
    });

    if (!topic) {
      throw 'notFound';
    }
    const stories = await Stories.find({
      topic: topic.id,
      private: false,
      draft: false,
    })
    .populate('comments')
    .populate('author');

    return {
      data: stories,
    };

  }


};
