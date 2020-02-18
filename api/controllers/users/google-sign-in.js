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
    }
  },


  fn: async function (inputs) {

    try {
      const payload = await sails.helpers.googleOauth(inputs.googleIdToken);

      // Check if the user is already registered
      const existingUser = await Users.findOne({
        googleId: payload.sub
      });
      if (existingUser) {
        return {
          message: 'Successfully signed in',
          user: existingUser,
          token: 'hello',
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
      return {
        message: 'Signed up successfully',
        user: newUser,
        token: 'hello',
      };
    } catch (error) {
      console.log(error);
      if (error.toString().includes('Error: Wrong number of segments in token:')) {
        throw {
          badRequest: 'Invalid googleIDToken',
        };
      } else {
        throw 'serverError';
      }
    }

  }


};
