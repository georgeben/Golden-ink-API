module.exports = {


  friendlyName: 'Google auth',


  description: 'Sign up/Sign in a user using their google account',


  inputs: {
    googleIdToken: {
      description: 'The ID token of the user (issued by google) after a user\'s google account is verified',
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      description: 'The user was authenticated successfully',
    },
    serverError: {
      description: 'Something bad happened',
      responseType: 'serverError'
    },
    badRequest: {
      description: 'A malformed googleIdToken was sent',
      responseType: 'badRequest'
    },
    forbidden: {
      description: 'The account has been deactivated',
      responseType: 'forbidden'
    }
  },


  fn: async function (inputs) {

    try {
      const payload = await sails.helpers.googleOauth(inputs.googleIdToken);

      // Check if the user is already registered
      const existingUser = await Users.findOne({
        googleId: payload.sub,
      })
        .populate('topics');
      if (existingUser && existingUser.deactivated) {
        return this.res.forbidden({
          message: 'Account is deactivated',
        });
      }
      // TODO: User just ID, username, slug and google ID when generating auth tokens
      if (existingUser) {
        const token = await sails.helpers.generateAuthToken.with({
          payload: existingUser,
        });
        return {
          message: 'Successfully signed in',
          data: {
            user: existingUser,
            token,
          },
        };
      }
      let newUser = {
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        profilePhotoUrl: payload.picture,
        emailNotificationSettings: {
          daily: true,
          weekly: false,
          reactions: true,
        },
      };

      newUser = await Users.create(newUser).fetch();
      const token = await sails.helpers.generateAuthToken.with({
        payload: newUser,
      });
      return {
        message: 'Signed up successfully',
        data: {
          newUser,
          token,
        },
      };
    } catch (error) {
      sails.log.error(error);
      if (error.toString().includes('Error: Wrong number of segments in token:')) {
        throw {
          badRequest: 'Invalid googleIDToken',
        };
      } else if (error.toString().includes('Error: Token used too late')) {
        throw {
          badRequest: 'Invalid googleIDToken',
        };
      } else {
        throw 'serverError';
      }
    }

  }


};
