/**
 * Stories.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      description: 'The title of the story',
      type: 'string',
      required: true
    },
    content: {
      description: 'The content of the story',
      type: 'string',
      required: true
    },
    topic: {
      description: 'The topic a story is related to',
      model: 'topics'
    },
    private: {
      description: 'Restricts the access of a story to only the user who created it.',
      type: 'boolean',
      defaultsTo: true
    },
    draft: {
      description: 'An unfinished story',
      type: 'boolean',
      defaultsTo: true
    },
    author: {
      description: 'The author of the story',
      model: 'users',
    },
    likedBy: {
      description: 'A collection of people that have liked a story',
      collection: 'users',
      via: 'likes',
    },
    comments: {
      description: 'The list of comments for a story',
      collection: 'comments',
      via: 'story',
    }

  },

};

