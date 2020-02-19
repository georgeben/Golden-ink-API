module.exports = {


  friendlyName: 'Get user story',


  description: '',


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
    const story = await Stories.findOne({
      slug: inputs.slug,
      author: this.req.user.id,
    })
    .populate('comments')
    .populate('author');
    if (!story) {
      throw 'notFound';
    }
    return {
      data: story,
    };

  }


};
