const amqplib = require('amqplib');

const runConsumer = async (listener) => {
  const connection = await amqplib.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlists', {
    durable: true,
  });

  await channel.consume(
      'export:playlists',
      (msg) => listener.listen(msg),
      {noAck: true},
  );

  console.log('Consumer is running');
};

module.exports = runConsumer;
