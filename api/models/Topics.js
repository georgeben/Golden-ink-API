/**
 * Topic.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    imageUrl: {
      type: 'string',
      required: true,
    },
    followers: {
      collection: 'users',
      via: 'topics'
    },
    stories: {
      collection: 'stories',
      via: 'topic',
    },
    slug: {
      description: 'A unique string to identify a topic',
      type: 'string',
      unique: true,
    }

  },

  beforeCreate: async function (recordToCreate, proceed) {
    // Create slug
    const slug = await sails.helpers.createSlug('topics', recordToCreate.name);
    recordToCreate.slug = slug;
    return proceed();
  },

  beforeUpdate: async function (valuesToSet, proceed) {
    // Create slug
    const slug = await sails.helpers.createSlug('topics', valuesToSet.name);
    valuesToSet.slug = slug;
    return proceed();
  }

};

