module.exports = {


  friendlyName: 'Update topic',


  description: 'Updates data about a topic',


  inputs: {
    slug: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
    },
    imageUrl: {
      type: 'string',
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
    // Check if topic exists
    if (!topic) {
      throw 'notFound';
    }
    const updatedTopic = await Topics.updateOne({ slug: inputs.slug }).set({
      name: inputs.name,
      imageUrl: inputs.imageUrl
    });

    // All done.
    return {
      data: updatedTopic
    };

  }


};
