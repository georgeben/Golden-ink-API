module.exports = {


  friendlyName: 'Add topic',


  description: 'Adds a new topic',


  inputs: {
    name: {
      description: 'The name of the topic',
      type: 'string',
      required: true,
    },
    imageUrl: {
      description: 'The yrl of the topic image',
      type: 'string',
      required: true,
    }
  },


  exits: {
    success: {
      description: 'The topic was successfully added'
    }
  },


  fn: async function (inputs) {

    // TODO Upload the topic image to cloudinary and save the URL
    // TODO Create a policy to restrict normal users from creating topics - allow only the admin

    const topic = await Topics.create(inputs).fetch();
    return {
      message: 'Successfully created topic',
      data: topic,
    };

  }


};
