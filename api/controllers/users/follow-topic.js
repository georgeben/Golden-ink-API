module.exports = {


  friendlyName: 'Follow topic',


  description: '',


  inputs: {
    topic: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    forbidden: {
      description: 'A user cannot follow one topic twice',
      responseType: 'forbidden',
    },
    notFound: {
      description: 'The topic to follow was not found',
      responseType: 'notFound',
    },
  },


  fn: async function (inputs) {
    // Find topic
    const topic = await Topics.findOne({
      slug: inputs.topic,
    });
    if (!topic) {
      throw 'notFound';
    }

    const user = await Users.findOne({
      id: this.req.user.id
    })
      .populate('topics');
    user.topics.forEach(followedTopic => {
      if (followedTopic.id === topic.id) {
        throw 'forbidden';
      }
    });
    await Users.addToCollection(user.id, 'topics', topic.id);
    return {
      message: 'Successfully followed topic'
    };

  }


};
