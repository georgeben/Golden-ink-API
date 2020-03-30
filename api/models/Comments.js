/**
 * Comments.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user: {
      description: 'The user who made the comment',
      model: 'users',
      required: true,
    },
    content: {
      description: 'The content of the comment',
      type: 'string',
      required: true,
    },
    story: {
      model: 'stories',
      required: true
    },
    /*  subComments: {
      collection: 'comments',
      via: 'parentComment'
    },
    parentComment: {
      model: 'comments',
    }
    */

  },

};

