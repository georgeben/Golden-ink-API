require('dotenv').config();
const amqp = require('amqplib');
const { notificationQueue } = require('./constants');
require('sails').load({}, (err) => {
  if (err) {
    sails.log.error('An error occurred while loading sails', err);
    return;
  }
  sails.log.info('Successfully loaded sails');
  consumeFromQueue(notificationQueue);
    
});

async function consumeFromQueue(queue) {
  try {
    const cluster = await amqp.connect({
      protocol: 'amqp',
      hostname: process.env.HOSTNAME,
      port: process.env.PORT,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      locale: 'en_US',
      frameMax: 0,
      heartbeat: 0,
      vhost: '/',
    });
    const channel = await cluster.createChannel();
    const ok = await channel.assertQueue(queue, {
      durable: true
    });
    sails.log.info(`👨🏾‍🚒Worker started👨🏾‍🚒`);
    sails.log.info({ ok });
    channel.prefetch(1);

    channel.consume(
      queue,
      async (message) => {
        if (message !== null) {
          const data = JSON.parse(message.content.toString());
          sails.log.info(`Received ${data.notificationType} job`);

          switch (data.notificationType) {
            case 'LIKE': {
              const notificationData = {
                actionType: data.notificationType,
                forUser: data.forUser,
                story: data.storyID,
                fromUser: data.fromUser,
              }
              if (data.comment) {
                notificationData.comment = data.comment;
              }
              const createdNotification = await Notifications.create(notificationData).fetch();
              sails.log.info({ createdNotification });
              return channel.ack(message);
            }
            case 'NEW_STORY':{
              const topic = await Topics.findOne({
                id: data.topic
              })
                .populate('followers');
              for (let follower of topic.followers) {
                await Notifications.create({
                  actionType: data.notificationType,
                  topic: data.topic,
                  story: data.storyID,
                  fromUser: data.fromUser,
                  forUser: follower.id,
                });
              }
              return channel.ack(message);
            }
            case 'COMMENT': {
              const createdNotification = await Notifications.create({
                actionType: data.notificationType,
                forUser: data.forUser,
                story: data.storyID,
                fromUser: data.fromUser
              }).fetch();
              sails.log.info({ createdNotification });
              return channel.ack(message);
            }
          }
        }
      },
      { noAck: false }
    );
  } catch (error) {
    sails.log.error('An error occurred in worker', error);
  }
}
