module.exports = {


  friendlyName: 'Un-follow topic',


  description: 'Removes a topic from a user\'s list of followed topics',


  inputs: {
    topic: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    forbidden: {
      description: 'A user cannot un-follow a topic that they don\'t already follow ',
      responseType: 'forbidden',
    },
    notFound: {
      description: 'The topic to un-follow was not found',
      responseType: 'notFound',
    },
  },


  fn: async function (inputs) {
    const topic = await Topics.findOne({
      slug: inputs.topic,
    });
    if (!topic) {
      throw 'notFound';
    }

    let user = await Users.findOne({
      id: this.req.user.id
    })
      .populate('topics');
    const followedTopic = user.topics.find(followedTopic => followedTopic.id === topic.id);
    if (!followedTopic) {
      throw 'forbidden';
    }
    await Users.removeFromCollection(user.id, 'topics', topic.id);
    user = await Users.findOne({
      id: this.req.user.id,
    })
      .populate('topics');
    return {
      message: 'Successfully un-followed topic',
      data: user.topics,
    };

  }


};
