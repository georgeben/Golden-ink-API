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

  'POST /api/v1/auth/google': { action: 'users/google-sign-in' },

  // TOPIC ENDPOINTS
  'GET /api/v1/topics': { action: 'topics/get-topics' },
  'POST /api/v1/topics': { action: 'topics/add-topic' },
  'PUT /api/v1/topics/:slug': { action: 'topics/update-topic' },
  'GET /api/v1/topics/:slug': { action: 'topics/get-single-topic' },

  //STORIES ENDPOINT
  'GET /api/v1/stories': { action: 'stories/get-stories' }
};
