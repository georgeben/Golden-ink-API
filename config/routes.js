/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  // AUTH ENDPOINTS
  'POST /api/v1/auth/google': { action: 'users/google-sign-in' },

  // TOPIC ENDPOINTS
  'GET /api/v1/topics': { action: 'topics/get-topics' },
  'POST /api/v1/topics': { action: 'topics/add-topic' },
  'PUT /api/v1/topics/:slug': { action: 'topics/update-topic' },
  'GET /api/v1/topics/:slug': { action: 'topics/get-single-topic' },

  //STORIES ENDPOINT
  'GET /api/v1/stories': { action: 'stories/get-stories' },

  // USER ENDPOINTS
  'GET /api/v1/users': { action: 'users/get-user-data' },
  'POST /api/v1/users/stories': { action: 'users/create-story' },
  'GET /api/v1/users/stories': { action: 'users/get-user-stories' },
  'PUT /api/v1/users/stories/:slug': { action: 'users/update-story' },
  'DELETE /api/v1/users/stories/:slug': { action: 'users/delete-story' },
};
