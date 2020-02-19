module.exports = {


  friendlyName: 'Delete story',


  description: 'Deletes a story from the database',


  inputs: {
    slug: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    notFound: {
      description: 'The story to update was not found',
      responseType: 'notFound',
    },
    forbidden: {
      description: 'The user is restricted from updating the story',
      responseType: 'forbidden',
    },
    serverError: {
      description: 'Something unexpected happened',
      responseType: 'serverError'
    }
  },


  fn: async function (inputs) {
    const user = this.req.user;
    // Find the story
    const story = await Stories.findOne({
      slug: inputs.slug
    });
    if (!story) {
      throw {
        notFound: 'The story was not found',
      };
    }

    if (story.author !== user.id) {
      throw {
        forbidden: 'You cannot perform this action'
      };
    }
    const result = await Stories.destroyOne({
      id: story.id,
    });
    return {
      message: 'Successfully deleted story',
      result,
    };

  }


};
