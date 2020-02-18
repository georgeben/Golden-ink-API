const jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Generate auth token',


  description: 'Generates a JWT token for the supplied payload',


  inputs: {
    payload: {
      description: 'The data used in creating the token',
      type: 'json',
      required: true,
    },
    options: {
      description: 'An object containing settings for creating the token',
      type: 'json',
    }
  },


  exits: {

    success: {
      description: 'Successfully created token',
    },

  },


  fn: async function ({ payload, options }) {
    const token = await jwt.sign(payload, sails.config.auth.jwtTokenSecret, options);
    return token;
  }


};

