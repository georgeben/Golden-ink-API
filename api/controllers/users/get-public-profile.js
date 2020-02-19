module.exports = {


  friendlyName: 'Get public profile',


  description: 'Retrieves a user\'s public profile',


  inputs: {
    slug: {
      type: 'string',
      required: true,
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    const user = await Users.findOne({
      slug: inputs.slug,
    }).populate('stories');

    user.stories = user.stories.filter(story => story.private === false && story.draft === false);
    return {
      data: user,
    };

  }


};
