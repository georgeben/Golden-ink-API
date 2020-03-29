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
  'DELETE /api/v1/auth/decativate': { action: 'auth/decativate-account' },

  // TOPIC ENDPOINTS
  'GET /api/v1/topics': { action: 'topics/get-topics' },
  'POST /api/v1/topics': { action: 'topics/add-topic' },
  'PUT /api/v1/topics/:slug': { action: 'topics/update-topic' },
  'GET /api/v1/topics/:slug': { action: 'topics/get-single-topic' },
  'GET /api/v1/topics/:slug/stories': { action: 'topics/get-topic-stories' },

  //STORIES ENDPOINT
  'GET /api/v1/stories': { action: 'stories/get-stories' },
  'POST /api/v1/stories': { action: 'stories/create-story' },
  'GET /api/v1/stories/:slug': { action: 'stories/get-story' },
  'POST /api/v1/stories/:story/comments': { action: 'comments/add-comment' },
  'GET /api/v1/stories/:story/comments': { action: 'comments/get-comments' },
  'GET /api/v1/stories/:story/comments/:commentId': { action: 'comments/get-comment' },
  'PUT /api/v1/stories/:story/comments/:commentId': { action: 'comments/update-comment' },
  'DELETE /api/v1/stories/:story/comments/:commentId': { action: 'comments/delete-comment' },

  // USER ENDPOINTS
  'GET /api/v1/users': { action: 'users/get-user-data' },
  'GET /api/v1/users/profile/:username': { action: 'users/get-public-profile' },
  'GET /api/v1/users/:username/stories': { action: 'users/get-stories-by-user'},
  'GET /api/v1/users/find': { action: 'users/check-for-user' },
  'GET /api/v1/users/stories': { action: 'users/get-user-stories' },
  'GET /api/v1/users/stories/:slug': { action: 'users/get-user-story' },
  'PUT /api/v1/users/stories/:slug': { action: 'users/update-story' },
  'DELETE /api/v1/users/stories/:slug': { action: 'users/delete-story' },
  'PUT /api/v1/users/profile': { action: 'users/update-profile' },
  'PUT /api/v1/users/likes/:story': { action: 'users/like-story' },
  'PUT /api/v1/users/favourites/:story': { action: 'users/add-favourite' },
  'GET /api/v1/users/favourites/': { action: 'users/get-favourites' },
  'GET /api/v1/users/bookmarks/': { action: 'users/get-bookmarks' },
  'PUT /api/v1/users/bookmarks/:story': { action: 'users/add-bookmark' },
  'DELETE /api/v1/users/bookmarks/:story':  { action: 'users/delete-bookmark' },
  'DELETE /api/v1/users/favourites/:story': { action: 'users/remove-favourite' },
  'DELETE /api/v1/users/likes/:story': { action: 'users/unlike-story' },
  'PUT /api/v1/users/topics/:topic': { action: 'users/follow-topic' },
  'DELETE /api/v1/users/topics/:topic': { action: 'users/unfollow-topic' },
  'PUT /api/v1/users/email-notifications': { action: 'users/update-notifications' },
  'GET /api/v1/users/feed': { action: 'users/get-feed' },
  'GET /api/v1/users/notifications': { action: 'users/notifications' },
  'PUT /api/v1/users/notifications': { action: 'users/update-notification-status' },

  'GET /api/v1/search': { action: 'search' }
};
