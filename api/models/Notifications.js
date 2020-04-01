/**
 * Notifications.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    actionType: {
      description: 'The type of action that produced the notification',
      type: 'string',
      isIn: ['LIKE', 'COMMENT', 'NEW_STORY'],
    },
    forUser: {
      model: 'users',
    },
    topic: {
      model: 'topics'
    },
    story: {
      model: 'stories'
    },
    comment: {
      model: 'comments',
    },
    fromUser: {
      model: 'users'
    },
    read: {
      type: 'boolean',
      defaultsTo: false,
    }

  },

};

