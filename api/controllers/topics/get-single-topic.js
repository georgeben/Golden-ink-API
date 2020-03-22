module.exports = {


  friendlyName: 'Get single topic',


  description: 'Retrieve the details of a single topic',


  inputs: {
    slug: {
      type: 'string',
      required: true
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
    })
      .populate('followers');

    if (!topic) {
      throw 'notFound';
    }
    // All done.
    return {
      data: topic,
    };

  }


};
