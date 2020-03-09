/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      description: 'A user\'s email address',
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'george@email.com'
    },
    username: {
      description: 'A unique string used to identify users',
      type: 'string',
      unique: true,
      maxLength: 50,
      required: false,
    },
    slug: {
      type: 'string',
      unique: true,
    },
    headline: {
      description: 'A user\'s profile headline',
      type: 'string',
      example: 'Business Analyst'
    },
    bio: {
      description: 'A short introduction about a user',
      type: 'string',
      maxLength: 300
    },
    googleId: {
      description: 'A user\'s googleId (issued by google) for retrieving/verifying a user\'s identity',
      type: 'string',
      required: true,
      unique: true
    },
    profilePhotoUrl: {
      description: 'The url of  a user\'s profile photo',
      type: 'string',
      defaultsTo: '',
    },
    topics: {
      // A user can follow many topics, and a topic can be followed by many users
      description: 'A collection of topics a user follows',
      collection: 'topics',
      via: 'followers'
    },
    stories: {
      // One to many - A user can write many stories, but a story can be written by only one user
      description: 'A collection of stories a user has written',
      collection: 'stories',
      via: 'author'
    },
    notifications: {
      // One to many - A user can have many notifications, but a notification can only be for one user
      description: 'A collection of notifications for a user',
      collection: 'notifications',
      via: 'forUser'
    },
    emailNotificationSettings: {
      type: 'json',
      description: 'A user\'s email notification settings',
      custom: function (value) {
        return (
          _.isObject(value) &&
          _.isBoolean(value.daily) &&
          _.isBoolean(value.weekly) &&
          _.isBoolean(value.reactions)
        );
      }
    },
    deactivated: {
      description: 'Whether a user has deactivated their account',
      type: 'boolean',
      defaultsTo: false
    },
    comments: {
      // One to many - A user can write many comments, but a comment can be written by only one user
      description: 'A collection of comments a user has made',
      collection: 'comments',
      via: 'user'
    },
    likes: {
      // Many to Many - A user can like many stories, a story can be liked by many users
      description: 'A collection of all the stories a user liked',
      collection: 'stories',
      via: 'likedBy'
    },
    bookmarks: {
      description: 'A collection of stories a user has bookmarked',
      collection: 'stories'
    },
    favourites: {
      description: 'A collection of a user\'s favourite stories',
      collection: 'stories'
    },

  },
  customToJSON: function () {
    return _.omit(this, ['googleId', 'deactivated']);
  },
  beforeCreate: async function (recordToCreate, proceed) {
    const slug = await sails.helpers.createSlug.with({
      modelName: 'users',
      value: recordToCreate.name
    });
    recordToCreate.slug = slug;
    recordToCreate.username = slug;
    return proceed();
  },

  beforeUpdate: async function (valuesToSet, proceed) {
    if (!valuesToSet.name) {
      return proceed();
    }
    const slug = await sails.helpers.createSlug.with({
      modelName: 'users',
      value: valuesToSet.name
    });
    valuesToSet.slug = slug;
    return proceed();
  }

};

