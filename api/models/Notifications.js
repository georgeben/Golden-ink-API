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
      isIn: ['LIKE', 'COMMENT', 'MENTION', 'NEW_STORY'],
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
    fromUser: {
      model: 'users'
    }

  },

};

