module.exports = {


  friendlyName: 'Update story',


  description: 'Updates data about a story',


  inputs: {
    slug: {
      description: 'The slug of the story to update',
      type: 'string',
      required: true,
    },
    title: {
      description: 'The title of the story',
      type: 'string',
    },
    content: {
      description: 'The content of the story',
      type: 'string',
    },
    topicSlug: {
      description: 'The slug of the topic the story belongs',
      type: 'string',
    },
    private: {
      description: 'Restricts the access of a story to only the user who created it.',
      type: 'boolean',
    },
    draft: {
      description: 'An unfinished story',
      type: 'boolean',
    },
  },


  exits: {
    badRequest: {
      description: 'invalid request data',
      responseType: 'badRequest',
    },
    forbidden: {
      description: 'The user is restricted from updating the story',
      responseType: 'forbidden',
    },
    notFound: {
      description: 'The story to update was not found',
      responseType: 'notFound',
    },
    serverError: {
      description: 'Something unexpected happened',
      responseType: 'serverError'
    }
  },


  fn: async function ({ slug, ...storyData }) {
    const user = this.req.user;
    const updatedData = storyData;
    // Find the story
    try {
      const story = await Stories.findOne({
        slug,
      });
      if (!story) {
        throw {
          notFound: 'The specified story  does not exist'
        };
      }

      // Check if the person sending the update req is the author of the story
      if (story.author !== user.id) {
        throw {
          forbidden: 'You cannot perform this action'
        };
      }

      if (storyData.topicSlug) {
        // if the user is updating the story's topic, i want to check if that topic exists
        const topic = await Topics.findOne({
          slug: storyData.topicSlug,
        });
        if (!topic) {
          throw {
            badRequest: 'Unknown topic',
          };
        }
        updatedData.topic = topic.id;
      }

      // Update the story
      const updatedStory = await Stories.updateOne({
        slug,
      }).set(updatedData);

      return {
        message: 'Successfully updated story',
        data: updatedStory,
      };
    } catch (error) {
      sails.log.error(error);
      switch (Object.keys(error)[0]) {
        case 'badRequest':
          throw error;
        case 'notFound':
          throw error;
        case 'forbidden':
          throw error;
        default:
          throw 'serverError';
      }
    }

  }


};
