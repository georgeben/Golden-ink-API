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
  'users/create-story': 'isLoggedIn',
  'users/get-user-stories': 'isLoggedIn',
  'users/update-story': 'isLoggedIn',
  'users/delete-story': 'isLoggedIn',
  'users/get-user-story': 'isLoggedIn',
  'users/update-profile': 'isLoggedIn',
  'comments/add-comment': 'isLoggedIn',
  'comments/update-comment': 'isLoggedIn'
};
