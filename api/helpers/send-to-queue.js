const amqp = require('amqplib');
module.exports = {


  friendlyName: 'Send to queue',


  description: 'Adds a new job to the task queue',


  inputs: {
    queue: {
      type: 'string',
      required: true
    },
    data: {
      type: 'json',
      required: true,
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    try {
      const cluster = await amqp.connect(sails.config.rabbitMQ.connectionOpts);
      const channel = await cluster.createChannel();
      const ok = await channel.assertQueue(inputs.queue, {
        durable: true,
      });
      // sails.log.info({ ok });
      const message = JSON.stringify(inputs.data);
      await channel.sendToQueue(inputs.queue, Buffer.from(message), { persistent: true });
      sails.log.info(`Sending message ${inputs.data.name} to queue ${inputs.queue}`);
    } catch (error) {
      sails.log.error('An error occurred', error);
    }
  }


};

