module.exports = {


  friendlyName: 'Check for user',


  description: 'Checks if a user with a given username/email exists',


  inputs: {
    email: {
      type: 'string',
    },
    username: {
      type: 'string'
    }
  },


  exits: {
    badRequest: {
      description: 'Invalid request data',
      responseType: 'badRequest',
    },
    notFound: {
      description: 'No topic with the specified slug was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function ({ username, email }) {
    if (!email && !username) {
      throw 'badRequest';
    }

    const criteria = {};
    username ? criteria.username = username : criteria.email = email;
    const user = await Users.findOne(criteria);
    if (!user) {
      return {
        data: false,
      };
    }

    return {
      data: true,
    };

  }


};
