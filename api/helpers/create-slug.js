const slugify = require('slugify');
const shortId = require('shortid');

module.exports = {


  friendlyName: 'Create slug',


  description: 'Creates a unique string used to identify a record',


  inputs: {
    modelName: {
      description: 'The name of the model to generate a slug',
      type: 'string',
      required: true
    },
    value: {
      description: 'The value to transform into a slug',
      type: 'string',
      required: true,
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const modelNames = Object.keys(sails.models);
    if (!modelNames.includes(inputs.modelName)) {
      throw new Error('Model not found');
    }

    let slug = slugify(inputs.value.toLowerCase(), {
      remove: /[*+~.()'"!:@?]/g
    });
    let existingRecord = await sails.models[inputs.modelName].findOne({
      slug,
    });

    while (existingRecord) {
      const uniqueId = shortId.generate();
      slug = slug + uniqueId;
      existingRecord = await sails.models[inputs.modelName].findOne({
        slug,
      });
    }
    return slug;
  }


};

