module.exports = {


  friendlyName: 'Create story',


  description: 'Creates a new story',


  inputs: {
    title: {
      description: 'The title of the story',
      type: 'string',
      required: true,
    },
    content: {
      description: 'The content of the story',
      type: 'string',
      required: true,
    },
    imageUrl: {
      description: 'A cover image for the story',
      type: 'string',
    },
    topicSlug: {
      description: 'The slug of the topic the story belongs',
      type: 'string',
      required: true,
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
    serverError: {
      description: 'Something unexpected happened',
      responseType: 'serverError'
    }
  },


  fn: async function ({ title, content, topicSlug, imageUrl, private, draft }) {
    const user = this.req.user;
    try {
      const topic = await Topics.findOne({
        slug: topicSlug,
      });
      if (!topic) {
        throw {
          badRequest: 'Unknown topic',
        };
      }
      const storyData = {
        title,
        content,
        imageUrl,
        topic: topic.id,
        private,
        draft,
        author: user.id,
      };
      const newStory = await Stories.create(storyData).fetch();

      // TODO Emit event to create NEW STORY notification
      return {
        message: 'Successfully created story',
        data: newStory,
      };
    } catch (error) {
      sails.log.error(error);
      if (error.badRequest) {
        throw error;
      }
      throw 'serverError';
    }

  }


};
