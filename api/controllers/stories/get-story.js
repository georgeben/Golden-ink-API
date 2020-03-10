module.exports = {


  friendlyName: 'Get story',


  description: 'Retrieves details bout a single story',


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

    const story = await Stories.findOne({
      slug: inputs.slug,
      private: false,
      draft: false,
    })
      .populate('comments')
      .populate('topic')
      .populate('author')
      .populate('likedBy');
    if (!story) {
      throw 'notFound';
    }
    return {
      data: story,
    };

  }


};
