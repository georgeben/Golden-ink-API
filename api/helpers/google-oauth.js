const { OAuth2Client } = require('google-auth-library');
module.exports = {


  friendlyName: 'Google oauth',


  description: 'Verifies a a user\'s identity using their google account, and retrieves their details ',


  inputs: {
    idToken: {
      type: 'string',
      required: true,
    }
  },


  exits: {

    success: {
      description: 'Successfully verified user',
    },

  },


  fn: async function (inputs) {
    const clientId = sails.config.google.clientId;
    const client = new OAuth2Client(clientId);

    const token = await client.verifyIdToken({
      idToken: inputs.idToken,
      audience: clientId,
    });
    const payload = token.getPayload();
    return payload;
  }


};

