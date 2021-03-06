/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  'users/get-user-data': 'isLoggedIn',
  'stories/create-story': 'isLoggedIn',
  'users/get-user-stories': 'isLoggedIn',
  'users/update-story': 'isLoggedIn',
  'users/delete-story': 'isLoggedIn',
  'users/get-user-story': 'isLoggedIn',
  'users/update-profile': 'isLoggedIn',
  'comments/add-comment': 'isLoggedIn',
  'comments/update-comment': 'isLoggedIn',
  'comments/delete-comment': 'isLoggedIn',
  'users/like-story': 'isLoggedIn',
  'users/unlike-story': 'isLoggedIn',
  'users/follow-topic': 'isLoggedIn',
  'users/unfollow-topic': 'isLoggedIn',
  'users/add-favourite': 'isLoggedIn',
  'users/remove-favourite': 'isLoggedIn',
  'users/get-favourites': 'isLoggedIn',
  'users/add-bookmark': 'isLoggedIn',
  'users/delete-bookmark': 'isLoggedIn',
  'users/get-bookmarks': 'isLoggedIn',
  'auth/decativate-account': 'isLoggedIn',
  'users/update-notifications': 'isLoggedIn',
  'users/get-feed': 'isLoggedIn',
  'users/notifications': 'isLoggedIn',
  'users/update-notification-status': 'isLoggedIn',
  'comments/like-comment': 'isLoggedIn',
  'comments/unlike-comment': 'isLoggedIn'
};
