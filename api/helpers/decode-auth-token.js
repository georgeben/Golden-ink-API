const jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Decode auth token',


  description: 'Decodes a jwt token',


  inputs: {
    token: {
      type: 'string',
      required: true,
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({ token }) {
    const payload = await jwt.verify(token, sails.config.auth.jwtTokenSecret);
    return payload;
  }


};

