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
    }

  },

};

